import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { voucherService } from "../../services/voucher";
import Header from "../../components/Header";
import DeliveryInfo from "../../components/Deliveryinfo";
import type { Shipping } from "../../types/shipping";

const Status = () => {
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
            <div className="flex flex-col gap-2">
              <h2 className="text-base md:text-xl font-medium font-title">
                {currentShipping?.product?.nome}
              </h2>
              <strong className="font-medium font-title text-xl md:text-3xl text-blue">
                Grátis
              </strong>
            </div>
          </div>

          <DeliveryInfo showTrack={true} data={currentShipping} />
        </div>
      </div>
    </>
  );
};

export default Status;
