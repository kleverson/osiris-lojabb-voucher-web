import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { voucherService } from "../../services/voucher";
import type { VoucherEntity } from "../../types/voucher";
import Header from "../../components/Header";
import FormInfo from "../../components/FormInfo";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../../components/Loading/Spinner";
import Footer from "../../components/Footer";

const Rescue = () => {
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState<VoucherEntity>();
  const [currentVariation, setCurrentVariation] =
    useState<VoucherEntity | null>(null);

  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false); // controla exibição do form

  // Busca inicial do voucher
  const getVoucher = useCallback(async (code: string) => {
    setLoading(true);
    try {
      const { data } = await voucherService.getVoucher(code);
      setCurrentVoucher(data);
    } catch (e) {
      console.log("[ERROR]", e);
    } finally {
      console.log(loading);
      setLoading(false);
    }
  }, []);

  const onChangeVariation = (index: number) => {
    if (currentVoucher?.variations) {
      setCurrentVariation(currentVoucher.variations[index]);
    }
  };

  const onUpdateStatus = useCallback((code?: string) => {
    if (!code) return;
    setSubmitted(true);
    setTrackingCode(code);
  }, []);

  // Polling recursivo com setTimeout
  useEffect(() => {
    if (!trackingCode) return;

    let isMounted = true;

    const pollStatus = async () => {
      try {
        const { data } = await voucherService.checkStatus(trackingCode);
        if (!isMounted) return;

        setStatus(data.mensagem);

        setTimeout(pollStatus, 1000);

        if (["PROCESSANDO", "Gerando NFe..."].includes(data.mensagem)) {
          setTrackingCode(null);
        }
      } catch (e) {
        console.log("[ERROR - status]", e);
        // tenta novamente em 1s se der erro
        setTimeout(pollStatus, 1000);
      }
    };

    pollStatus();

    return () => {
      isMounted = false;
    };
  }, [trackingCode]);

  // Busca inicial do voucher
  useEffect(() => {
    if (code) getVoucher(code);
  }, [code, getVoucher]);

  return (
    <>
      {/* Loading full screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center gap-4"
          >
            <Spinner type="primary" />{" "}
            {/* ou "success", "secondary", conforme seu Spinner */}
            <motion.span
              className="text-xl font-medium text-blue-700"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Carregando dados...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status overlay */}
      {status && (
        <AnimatePresence>
          <motion.div
            key={status}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded text-center h-screen w-screen fixed top-0 left-0 flex items-center justify-center gap-2 ${
              status === "Gerando NFe..."
                ? "bg-green-900 text-white"
                : status === "CANCELADO"
                ? "bg-red-100 text-red-700"
                : "bg-yellow text-blue"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <Spinner type={status === "Gerando NFe..." ? "success" : ""} />
              <span className="text-2xl uppercase">{status}</span>
            </div>

            {status === "PROCESSANDO" && (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-blue-700 rounded-full"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 0,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Main content */}
      {!submitted && (
        <div className="container mx-auto">
          <Header title="Resumo do mimo" />

          <div className="py-10 md:py-20 w-[90%] md:w-[80%] mx-auto">
            <div className="product flex md:flex-row flex-col gap-14 py-10 border-b border-b-[#CECECE]">
              <div className="thumb bg-[#F4F4F6] px-14 py-11">
                <img src={"/imgs/mimo_desk.png"} width={80} alt="" />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-base md:text-xl font-medium font-title">
                  {currentVoucher?.nome}
                </h2>
                <strong className="font-medium font-title text-xl md:text-3xl text-blue">
                  Grátis
                </strong>

                {currentVoucher?.variations && (
                  <div className="flex-1 mt-6">
                    <label className="block mb-1 md:text-xl font-normal font-body text-xl">
                      Selecione a cor do seu brinde:
                    </label>
                    <select
                      className="w-full border p-2 rounded border-[#CECECE]"
                      onChange={(e) =>
                        onChangeVariation(Number(e.target.value))
                      }
                    >
                      <option value="">Selecione</option>
                      {currentVoucher.variations.map((item, index) => (
                        <option value={index} key={item.id}>
                          {item.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <FormInfo
              codeVoucher={code!}
              variation={currentVariation}
              onUpdateStatus={onUpdateStatus}
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Rescue;
