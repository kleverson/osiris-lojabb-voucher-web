import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { voucherService } from "../../services/voucher";
import Header from "../../components/Header";
import DeliveryInfo from "../../components/Deliveryinfo";
import type { Shipping } from "../../types/shipping";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../../components/Loading/Spinner";
import Footer from "../../components/Footer";

const Status = () => {
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(false);

  const [currentShipping, setCurrentShipping] = useState<Shipping>();

  const [currentTracking, setCurrentTracking] = useState(1);

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
    if (currentShipping) {
      if (currentShipping?.shipping.trackingUrl) {
        if (!currentShipping.shipping.trackingstatus?.status) {
          setCurrentTracking(1);
        } else {
          switch (currentShipping.shipping.trackingstatus?.status) {
            case "Entregue":
              setCurrentTracking(5);
              break;
            case "Saiu para entrega":
              setCurrentTracking(3);
              break;
            default:
              setCurrentTracking(2);
          }
        }
      }
    }
  }, [currentShipping]);

  useEffect(() => {
    if (code) {
      getVoucher(code);
    }
  }, [code]);
  return (
    <>
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
              Carregando informações do resgate...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto">
        <Header title={"Recebemos seu pedido"} />

        <div className="py-10 md:py-20 w-[90%] md:w-[80%] mx-auto">
          <div className="product flex md:flex-row flex-col gap-14 py-10 border-b border-b-[#CECECE]">
            <div className="thumb bg-[#F4F4F6] px-14 py-11 max-w-[200px]">
              <img
                src={currentShipping?.product.images[0].url}
                height={80}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="text-base md:text-xl font-medium font-title">
                {currentShipping?.product?.nome}
              </h2>
            </div>
          </div>

          <DeliveryInfo
            showTrack={true}
            data={currentShipping}
            currentTrack={currentTracking}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Status;
