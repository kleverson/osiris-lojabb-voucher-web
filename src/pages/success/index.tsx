import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { voucherService } from "../../services/voucher";
import type { Shipping } from "../../types/shipping";
import { motion } from "framer-motion";

const Rescue = () => {
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(false);

  const [currentShipping, setCurrentShipping] = useState<Shipping>();

  async function getVoucher(code: string) {
    setLoading(true);
    console.log(loading);
    try {
      const { data } = await voucherService.checkStatus(code);
      setCurrentShipping(data);
      console.log("result", data);
    } catch (e) {
      console.log("[ERROR]", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (code) {
      getVoucher(code);
    }
  }, [code]);
  return (
    <>
      <div
        className="wrapper h-auto md:h-screen w-screen bg-yellow bg-[url('/imgs/bg_success.png')] md:bg-[url('/imgs/bg_success.png')] bg-cover bg-center md:bg-right"
        style={{
          backgroundSize: window.innerWidth < 768 ? "cover" : "90% 100%",
        }}
      >
        <div className="container mx-auto py-6 pb-0 md:pb-6 md:py-10">
          <h1 className="px-6">
            <img src="/imgs/storebrand.png" alt="" />
          </h1>
        </div>

        <div className="container mx-auto  mt-0 md:mt-4 h-full md:h-auto flex md:block">
          <div className="flex gap-6 md:pl-24 flex-col items-center justify-center max-w-[800px] mx-auto relative md:top-0 top-[30px] pb-9">
            <div className="flex flex-col mt-10">
              <div className="flex flex-col gap-4 border-b-[1px] border-blue pb-6 mb-6 md:pb-10 md:mb-10 text-center max-w-[90%] mx-auto md:max-w-[100%] ">
                <svg
                  width="65"
                  height="64"
                  viewBox="0 0 65 64"
                  className="mx-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.5"
                    y="2"
                    width="60"
                    height="60"
                    rx="30"
                    stroke="#465EFF"
                    stroke-width="4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M48.4995 23.1243L26.9661 44.3242L17.4995 35.0043L20.3437 32.2041L26.9661 38.724L45.6552 20.3242L48.4995 23.1243Z"
                    fill="#465EFF"
                  />
                </svg>

                <h2 className="text-[32px] md:text-5xl font-title text-blue leading-none px-8 md:px-0">
                  Brinde resgatado{" "}
                  <span className="relative">
                    <span className="relative z-10">com</span>{" "}
                    <strong className="relative z-10">sucesso </strong>
                    <div
                      className={`bg-[#00EBD0] h-4 w-[190px] md:w-[282px] right-0 absolute bottom-0 hidden md:block`}
                    ></div>
                  </span>
                </h2>

                <p className="font-light font-body text-xl text-graybb px-8">
                  Acompanhe os detalhes da entrega pelo e-mail cadastrado..
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6 md:gap-14 ">
                <div className="thumb flex md:flex-row flex-col gap-5 items-start px-8">
                  <motion.img
                    key={currentShipping?.product?.images[0].url}
                    src={currentShipping?.product?.images[0].url}
                    width={200}
                    alt=""
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />

                  <h2 className="font-bold font-title text-graybb text-xl">
                    {currentShipping?.product.nome}
                  </h2>
                </div>
                {/* <div className="md:hidden border-b-[1px] border-blue w-full max-w-[90%] mx-auto md:max-w-[100%]"></div> */}
                <div className="flex flex-col gap-4 px-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 gap-2">
                      <h4 className="text-xl font-medium font-title">
                        Informações de contato
                      </h4>
                      <p>{currentShipping?.shipping.name}</p>
                      <p>{currentShipping?.shipping.email}</p>
                    </div>

                    <div className="flex-1 gap-2">
                      <h4 className="text-xl font-medium font-title">
                        Endereço pra entrega
                      </h4>
                      <p>
                        CEP {currentShipping?.shipping.address.cep} <br />
                        {currentShipping?.shipping.address.endereco}{" "}
                        {currentShipping?.shipping.address.numero},{" "}
                        {currentShipping?.shipping.address.bairro},{" "}
                        {currentShipping?.shipping.address.municipio} -{" "}
                        {currentShipping?.shipping.address.uf}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rescue;
