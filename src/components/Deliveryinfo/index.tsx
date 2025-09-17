import type { Shipping } from "../../types/shipping";
import TrackInfo from "../TrackInfo";

type props = {
  data?: Shipping;
  showTrack?: boolean;
  currentTrack?: number;
};

const DeliveryInfo = ({ data, showTrack, currentTrack }: props) => {
  return (
    <div className="py-10">
      <h3 className="font-title font-medium text-xl md:text-[32px]">
        Acompanhe a entrega
      </h3>

      {showTrack && <TrackInfo />}

      <div className="py-4 md:py-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 gap-2 py-5">
          <h4 className="text-xl font-medium font-title">
            Informações de contato
          </h4>
          <p>{data?.shipping.name}</p>
          <p>{data?.shipping.email}</p>
        </div>

        <div className="flex-1 gap-2 py-5">
          <h4 className="text-xl font-medium font-title">
            Endereço pra entrega
          </h4>
          <p>
            CEP {data?.shipping.address.cep} {data?.shipping.address.endereco}{" "}
            {data?.shipping.address.numero}, {data?.shipping.address.bairro},{" "}
            {data?.shipping.address.municipio} - {data?.shipping.address.uf}
          </p>
        </div>

        <div className="flex-1 gap-2 py-5">
          <p>
            <strong className="text-xl font-medium font-title">
              Previsão de entrega:
            </strong>{" "}
            {data?.shipping.delivery_estimated}
          </p>
          <p>
            <strong className="text-xl font-medium font-title">
              Para mais detalhes, acesse:
            </strong>
            <br />
            <a
              href={data?.shipping.trackingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue text-underline font-bold"
            >
              {data?.shipping.trackingUrl}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
