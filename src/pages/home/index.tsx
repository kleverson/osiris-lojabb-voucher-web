import { motion } from "framer-motion";
import FormCheckByEmail from "../../components/FormCheckByEmail";

const Home = () => {
  return (
    <>
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
              <div className="flex thumb w-full md:w-auto items-center justify-center md:justify-start">
                <img
                  src={"/imgs/mimo_mb.png"}
                  className="w-[163px] md:hidden block"
                  alt=""
                />
                <img
                  src={"/imgs/mimo_desk.png"}
                  className=" md:block hidden"
                  alt=""
                />
              </div>

              <div className="flex flex-col">
                <h2 className="md:text-5xl text-2xl font-title text-blue leading-none">
                  Você ganhou um
                </h2>
                <div className="md:px-28 px-10 flex flex-col gap-6">
                  <h3 className="font-title font-extrabold text-[64px] md:text-[130px] text-blue leading-none relative">
                    <span className="relative z-10">Brinde</span>

                    <div
                      className={`bg-[#00EBD0] h-4 md:h-6 w-[190px] md:w-[430px] absolute bottom-0`}
                    ></div>
                  </h3>
                </div>
                <FormCheckByEmail searchByEmail={true} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
