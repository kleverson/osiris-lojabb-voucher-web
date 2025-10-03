import { useEffect, useState, useCallback, use } from "react";

import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { voucherService } from "../../services/voucher";
import Header from "../../components/Header";
import FormInfo from "../../components/FormInfo";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../../components/Loading/Spinner";
import Footer from "../../components/Footer";
import TruncateDescription from "../../components/TruncateDescription";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import type { Product, Products } from "../../types/products";
import { toast } from "react-toastify";

const Rescue = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<Products>();
  const [currentVariation, setCurrentVariation] = useState<Product | null>(
    null
  );

  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false); // controla exibição do form
  const [isConfirm, setIsConfirm] = useState(false);

  const [variationIndex, setVariationIndex] = useState(0);

  const location = useLocation();
  const { email } = location.state || {};

  // Busca inicial do voucher
  const getVoucher = useCallback(async (code: string) => {
    setLoading(true);

    try {
      const { data } = await voucherService.detailProduct(code);
      setDetail(data);
    } catch (e) {
      console.log("[ERROR]", e);
    } finally {
      console.log(loading);
      setLoading(false);
      setVariationIndex(0);
    }
  }, []);

  useEffect(() => {
    if (isConfirm) {
      const el = document.getElementById("content-rescue");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isConfirm]);

  useEffect(() => {
    if (detail?.products && detail.products.length > 0) {
      setCurrentVariation(detail.products[variationIndex]);

      setCurrentProductId(detail.products[variationIndex].id);
    }

    if (detail?.is_private && !email) {
      toast.info("Por favor, informe seu email para resgatar o mimo");
      navigate("/");
    }
  }, [detail, variationIndex]);

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
              Carregando dados do mimo...
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
          <Header title="Checkout" />

          <div
            className="py-10 md:py-20 w-[90%] md:w-[80%] mx-auto"
            id="content-rescue"
          >
            <h2 className="text-xl md:text-[32px] font-medium text-graybb py-6 md:py-10">
              {isConfirm ? "Confirme seus dados" : "Resgate o brinde desejado"}
            </h2>
            <div className="product flex md:flex-row flex-col gap-14 py-10 border-b border-b-[#CECECE]">
              <div className="flex flex-col gap-2 justify-center md:hidden">
                {detail?.products && detail.products.length > 0 ? (
                  <>
                    <div className="flex gap-4 mb-8">
                      {detail.products.map((item: Product, index: number) => (
                        <button
                          key={index}
                          className={`bg-[#F4F4F6] rounded-lg border-2 cursor-pointer p-1 ${
                            currentVariation?.id === item.id
                              ? "border-blue border-2"
                              : ""
                          }`}
                          onClick={() => {
                            setVariationIndex(index);
                          }}
                          data-tooltip-id="variation-tooltip"
                          data-tooltip-content={item.nome}
                          aria-label={`Select ${item.nome}`}
                        >
                          <motion.img
                            src={item?.images[0].url}
                            width={80}
                            alt={item.nome}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {detail?.products && (
                  <>
                    <div className="flex-1 mt-6 hidden md:block">
                      <h2 className="text-base md:text-xl font-medium font-title">
                        {currentVariation?.nome}
                      </h2>
                      <TruncateDescription
                        html={currentVariation?.descricao || ""}
                        maxLength={200}
                      />
                    </div>
                    <div className="flex py-8 border-t-graybb"></div>
                  </>
                )}
              </div>
              <div className="thumb bg-[#F4F4F6] max-h-[272px] min-w-[272px] flex items-center justify-center">
                <motion.img
                  key={currentVariation?.images[0].url}
                  src={currentVariation?.images[0].url}
                  width={272}
                  alt=""
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {detail?.products && (
                <>
                  <div className="flex-1 mt-6 block md:hidden">
                    <h2 className="text-base md:text-xl font-medium font-title">
                      {currentVariation?.nome}
                    </h2>
                    <TruncateDescription
                      html={currentVariation?.descricao || ""}
                      maxLength={200}
                    />
                  </div>
                </>
              )}

              <div className="md:flex flex-col gap-2 justify-center hidden">
                {detail?.products && detail.products.length > 0 ? (
                  <>
                    <div className="flex gap-4 mb-8">
                      {detail.products.map((item: Product, index: number) => (
                        <button
                          key={index}
                          className={`bg-[#F4F4F6] rounded-lg border-2 cursor-pointer p-1 ${
                            currentVariation?.id === item.id
                              ? "border-blue border-2"
                              : ""
                          }`}
                          onClick={() => {
                            setVariationIndex(index);
                          }}
                          data-tooltip-id="variation-tooltip"
                          data-tooltip-content={item.nome}
                          aria-label={`Select ${item.nome}`}
                        >
                          <motion.img
                            src={item?.images[0].url}
                            width={80}
                            alt={item.nome}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {detail?.products && (
                  <>
                    <div className="flex-1 mt-6">
                      <h2 className="text-base md:text-xl font-medium font-title">
                        {currentVariation?.nome}
                      </h2>
                      <TruncateDescription
                        html={currentVariation?.descricao || ""}
                        maxLength={200}
                      />
                    </div>
                    {Number(currentVariation?.sizes?.length) > 0 && (
                      <div className="flex py-8 border-t-graybb">
                        <select
                          onChange={(e) => {
                            setCurrentProductId(Number(e.target.value));
                          }}
                          className="border border-graybb rounded-lg p-2 mt-4 w-full md:w-1/2"
                        >
                          {currentVariation?.sizes?.map(
                            (size, index: number) => (
                              <option key={index} value={size.id}>
                                {size.nome}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {detail?.usado == true && (
              <div className="bg-red-400 p-4 rounded-2xl my-6">
                <p className="md:text-xl text-base text-white">
                  <strong>Ops!</strong> <br /> Este voucher não esta mais
                  disponivel para resgate!
                </p>
              </div>
            )}

            {!detail?.usado && (
              <FormInfo
                setOnConfirm={() => setIsConfirm(!isConfirm)}
                codeVoucher={code!}
                variation={currentProductId}
                onUpdateStatus={onUpdateStatus}
              />
            )}
          </div>
        </div>
      )}
      <Tooltip
        id="variation-tooltip"
        place="top"
        style={{
          backgroundColor: "#FCFC30",
          color: "#465EFF",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "16px",
        }}
      />
      <Footer />
    </>
  );
};

export default Rescue;
