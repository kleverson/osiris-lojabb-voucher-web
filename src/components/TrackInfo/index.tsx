const steps = [
  "RECEBIDO",
  "CONFIRMADO",
  "ENVIADO",
  "SAIU PRA ENTREGA",
  "ENTREGUE",
];
const currentStep = 5; // 0-indexed, "ENVIADO"

const TrackInfo = () => {
  return (
    <div className="py-10">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isUpcoming = index > currentStep;

          // Círculo de status
          const circleClass = `
            h-4 w-4 rounded-md
            ${isCompleted ? "bg-black" : ""}
            ${isActive ? "bg-gray-300" : ""}
            ${isUpcoming ? "bg-gray-300" : ""}
          `;

          // Linha de conexão (entre os pontos)
          const lineClass = `
            border-t-2 w-full
            ${isCompleted ? "border-black" : ""}
            ${isActive ? "border-gray-500" : ""}
            ${isUpcoming ? "border-gray-300" : ""}
          `;

          return (
            <div key={index} className="flex flex-row flex-1 items-start">
              <div className="flex-1">
                <div className="track flex relative items-center">
                  {/* Ponto */}
                  <div className={circleClass}></div>

                  {/* Linha (não mostrar no último item) */}
                  {index !== steps.length - 1 && (
                    <div className={lineClass}></div>
                  )}
                </div>
                {/* Nome da etapa */}
                <div className="mt-2 text-xs text-left">{step}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackInfo;
