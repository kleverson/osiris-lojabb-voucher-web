import { motion } from "framer-motion";

type props = {
  title: string;
  subtitle: string;
  text: string;
  onBack: () => void;
};
const ErrorComponent = ({ title, subtitle, text, onBack }: props) => {
  <motion.div
    key="content"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
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
          <div className="flex flex-col">
            <h2 className="md:text-5xl text-2xl font-title text-blue leading-none">
              {title}
            </h2>
            <div className="md:px-28 px-10 flex flex-col gap-6">
              <h3 className="font-title font-extrabold text-[64px] md:text-[130px] text-blue leading-none relative">
                <span className="relative z-10">{subtitle}</span>
                <div className="bg-[#00EBD0] h-4 md:h-6 w-[190px] md:w-[390px] absolute bottom-0"></div>
              </h3>

              <p className="md:text-xl text-base">{text}</p>
            </div>
            <div className="w-full mt-6 md:px-28 px-0">
              <button
                className="bg-blue text-white px-6 py-4 text-base font-bold rounded-[4px] w-full md:w-auto"
                onClick={onBack}
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>;
};

export default ErrorComponent;
