import { useEffect, useState } from "react";

const steps = [
  "RECEBIDO",
  "CONFIRMADO",
  "ENVIADO",
  "SAIU PRA ENTREGA",
  "ENTREGUE",
];

type props = {
  currentTrack: number | null;
};

const TrackInfo = ({ currentTrack }: props) => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (!!currentTrack && currentTrack > 1) {
      setCurrentStep(currentTrack - 1 >= 0 ? currentTrack - 1 : 0);
    }
  }, [currentTrack]);

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isUpcoming = index > currentStep;

          const circleClass = `
          h-4 w-4 rounded-md
          ${isCompleted ? "bg-black" : ""}
          ${isActive ? "bg-[#333333]" : ""}
          ${isUpcoming ? "bg-gray-300" : ""}
        `;

          // Linha horizontal para desktop, vertical para mobile
          const lineClass = `
          md:border-t-2 md:w-full
          border-l-2 w-0 h-4 md:h-0
          ${isCompleted ? "border-black" : ""}
          ${isActive ? "border-[#333333]" : ""}
          ${isUpcoming ? "border-gray-300" : ""}
        `;

          return (
            <>
              <div
                key={index}
                className="flex-1 items-start pb-8 md:flex hidden"
              >
                <div className="flex-1">
                  <div className="track flex relative items-center">
                    <div className={circleClass}></div>

                    {index !== steps.length - 1 && (
                      <div className={lineClass}></div>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-left font-body font-bold">
                    {step}
                  </div>
                </div>
              </div>
              <div
                key={index}
                className="md:hidden flex md:flex-1 flex-row md:flex-col md:items-center items-start"
              >
                <div className="flex md:flex-row flex-col items-center">
                  <div className={circleClass}></div>
                  {index !== steps.length - 1 && (
                    <div className={lineClass}></div>
                  )}
                </div>
                <div className="ml-2 md:ml-0 md:mt-2 text-xs text-left">
                  {step}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TrackInfo;
