import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import animation from "../../assets/animate/animate.json";
import { voucherService } from "../../services/voucher";
import type { VoucherEntity } from "../../types/voucher";

import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import axios from "axios";
import FormCheckByEmail from "../../components/FormCheckByEmail";

const Voucher = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(false);

  const [currentVoucher, setCurrentVoucher] = useState<VoucherEntity>();
  const [isMimo, setIsMimo] = useState(true);

  async function getVoucher(code: string) {
    setLoading(true);
    try {
      const { data } = await voucherService.getVoucher(code);
      setCurrentVoucher(data);
      console.log("result", data);
    } catch (error: unknown) {
      let message = "Ocorreu um erro";

      if (axios.isAxiosError(error)) {
        // erro do Axios
        if (error.response) {
          // resposta do servidor

          message = error.response.data?.msg || message;
          toast.error(message);
        } else if (error.request) {
          // sem resposta
          console.error("Sem resposta do servidor:", error.request);
          message = "Sem resposta do servidor";
        }
      } else {
        // erro genérico
        console.error("Erro desconhecido:", error);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }

  useEffect(() => {
    if (code) {
      getVoucher(code);
    }
  }, [code]);

  useEffect(() => {
    if (
      currentVoucher &&
      currentVoucher?.deposito_nome.toLocaleLowerCase().includes("unibb")
    ) {
      setIsMimo(false);
    }
  }, [currentVoucher]);
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-yellow z-50 flex flex-col items-center justify-center gap-4"
          >
            <motion.div
              className="text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Lottie
                animationData={animation}
                loop={false}
                autoplay={true}
                style={{ width: 200, height: 200 }}
              />
              <p className="mt-2 text-lg font-medium text-blue-700">
                Buscando seu mimo...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="wrapper h-screen w-screen bg-[url('/imgs/bg_mobile.png')] md:bg-[url('/imgs/bg.png')] bg-cover bg-center md:bg-right"
            style={{
              backgroundSize:
                window.innerWidth < 768 ? "100% 100%" : "90% 100%", // mobile vs desktop
            }}
          >
            <div className="container mx-auto pt-10 pb-6 px-6">
              <h1>
                <img src="/imgs/storebrand.png" alt="" />
              </h1>
            </div>

            <div className="container mx-auto px-8 mt-4">
              <div className="flex gap-6 md:pl-24 flex-col md:flex-row">
                <div className="flex thumb w-full md:w-auto items-center justify-center md:justify-start">
                  <img
                    src={"/imgs/mimo_mb.png"}
                    className="w-[163px] md:hidden block"
                    alt=""
                  />
                  <img
                    src={"/imgs/mimo_desk.png"}
                    className=" md:block hidden"
                    alt=""
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="md:text-5xl text-2xl font-title text-blue leading-none">
                    Você ganhou um
                  </h2>
                  <div className="md:px-28 px-10 flex flex-col gap-6">
                    <h3 className="font-title font-extrabold text-[64px] md:text-[130px] text-blue leading-none relative">
                      <span className="relative z-10">
                        {isMimo ? "mimo" : "Brinde"}
                      </span>
                      {isMimo ? (
                        <div
                          className={`bg-[#00EBD0] h-4 md:h-6 w-[190px] md:w-[390px] absolute bottom-0`}
                        ></div>
                      ) : (
                        <div
                          className={`bg-[#00EBD0] h-4 md:h-6 w-[190px] md:w-[430px] absolute bottom-0`}
                        ></div>
                      )}
                    </h3>
                    {!currentVoucher?.is_private && (
                      <>
                        <h4 className="text-2xl md:text-5xl">
                          {currentVoucher?.nome}
                        </h4>

                        <p className="md:text-xl text-base">
                          <strong>Esta quase lá!</strong> <br /> Confira os
                          detalhes e finalize o<br /> resgate para receber seu
                          brinde.
                        </p>
                      </>
                    )}
                    {currentVoucher?.usado == true && (
                      <div className="bg-red-400 p-4 rounded-2xl">
                        <p className="md:text-xl text-base text-white">
                          <strong>Que pena!</strong> <br /> Este voucher já foi
                          utilizado!
                        </p>
                      </div>
                    )}
                  </div>
                  {!currentVoucher?.usado && (
                    <>
                      {currentVoucher?.is_private ? (
                        <>
                          <FormCheckByEmail code={code} />
                        </>
                      ) : (
                        <div className="w-full mt-6 md:px-28 px-0">
                          <button
                            className={`bg-blue text-white px-6 py-4 text-base font-bold rounded-[4px] w-full md:w-auto ${
                              currentVoucher?.usado
                                ? "opacity-80 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() => navigate(`/${code}/rescue`)}
                            disabled={currentVoucher?.usado}
                          >
                            Resgatar
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Voucher;
