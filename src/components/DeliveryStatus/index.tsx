const DeliveryStatus = () => {
  return (
    <div className="py-10">
      <h3 className="font-title font-medium text-xl md:text-[32px]">
        Acompanhe a entrega
      </h3>

      <div className="py-4 md:py-10 flex flex-col md:flex-row gap-4">
        <div className="flex-1 gap-2 py-5">
          <h4 className="text-xl font-medium font-title">
            Informações de contato
          </h4>
          <p>Jessica Jones</p>
          <p>jess_jones@email.com.br</p>
        </div>

        <div className="flex-1 gap-2 py-5">
          <h4 className="text-xl font-medium font-title">
            Endereço pra entrega
          </h4>
          <p>
            CEP 00000-000 Rua Alaís Jardim de Oliveira 325 Bairro da Luz,
            Horizonte - CE
          </p>
        </div>

        <div className="flex-1 gap-2 py-5">
          <p>
            <strong className="text-xl font-medium font-title">
              Previsão de entrega:
            </strong>{" "}
            09/03/1999
          </p>
          <p>
            <strong className="text-xl font-medium font-title">
              Para mais detalhes, acesse:
            </strong>
            <br />
            <a
              href="http://google.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue text-underline font-bold"
            >
              www.entrega.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatus;
