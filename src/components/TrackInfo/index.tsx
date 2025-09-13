const steps = [
  "RECEBIDO",
  "CONFIRMADO",
  "ENVIADO",
  "SAIU PRA ENTREGA",
  "ENTREGUE",
];
const currentStep = 2; // 0-indexed, "ENVIADO"

const TrackInfo = () => {
  return (
    <div className="py-10">
      <div className="max-w-[650px] flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex-flex-row items-start">
              <div className="flex-1">
                <div className="track flex relative items-center">
                  <div
                    className={`h-4 w-4 rounded-md ${
                      isCompleted ? "bg-black" : ""
                    } ${isActive ? "bg-blue" : ""} ${
                      !isActive && isCompleted ? "border-blue" : ""
                    }`}
                  ></div>
                  <div
                    className={`border-t-2 min-w-[130px] ${
                      isCompleted ? "border-black" : ""
                    } ${isActive ? "border-blue" : ""}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-center w-20">{step}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackInfo;
