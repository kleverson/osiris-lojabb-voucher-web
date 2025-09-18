import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { voucherService } from "../../services/voucher";
import type { VoucherEntity } from "../../types/voucher";

import "./style.css";
import Loading from "../../components/Loading";

const Voucher = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(false);

  const [currentVoucher, setCurrentVoucher] = useState<VoucherEntity>();

  async function getVoucher(code: string) {
    setLoading(true);
    try {
      const { data } = await voucherService.getVoucher(code);
      setCurrentVoucher(data);
      console.log("result", data);
    } catch (e) {
      console.log("[ERROR]", e);
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
  return (
    <>
      {loading ? (
        <Loading theme="BLUE" />
      ) : (
        <div
          className="wrapper h-screen w-screen bg-[url('/imgs/bg_mobile.png')] md:bg-[url('/imgs/bg.png')] bg-cover bg-center md:bg-right"
          style={{
            backgroundSize: window.innerWidth < 768 ? "100% 100%" : "90% 100%", // mobile vs desktop
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
                  src={"/imgs/mimo_desk.png"}
                  className="w-[163px] md:hidden block"
                  alt=""
                />
                <img
                  src={"/imgs/mimo_mb.png"}
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
                    <span className="relative z-10">mimo</span>
                    <div className="bg-[#00EBD0] h-4 md:h-6 w-[190px] md:w-[390px] absolute bottom-0"></div>
                  </h3>

                  <h4 className="text-2xl md:text-5xl">
                    {currentVoucher?.nome}
                  </h4>

                  <p className="md:text-xl text-base">
                    <strong>Esta quase lá!</strong> <br /> Confira os detalhes e
                    finalize o<br /> resgate para receber seu brinde.
                  </p>
                </div>
                <div className="w-full mt-6 md:px-28 px-0">
                  <button
                    className="bg-blue text-white px-6 py-4 text-base font-bold rounded-[4px] w-full md:w-auto"
                    onClick={() => navigate(`/${code}/rescue`)}
                  >
                    Resgatar mimo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Voucher;
