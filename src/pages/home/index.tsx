import FormValidate from "../../components/FormValidate";

const Home = () => {
  return (
    <>
      <div
        className="wrapper h-screen w-screen bg-[url('/imgs/bg_mobile.png')] md:bg-[url('/imgs/bg.png')] bg-cover bg-center md:bg-right"
        style={{
          backgroundSize: window.innerWidth < 768 ? "100% 100%" : "90% 100%", // mobile vs desktop
        }}
      >
        <div className="container mx-auto py-6 md:py-10">
          <h1 className="px-6">
            <img src="/imgs/storebrand.png" alt="" />
          </h1>
        </div>

        <div className="container mx-auto px-8 mt-4 h-full md:h-auto flex md:block">
          <div className="flex gap-6 md:pl-24 flex-col items-center justify-center">
            <div className="flex flex-col mt-10">
              <h2 className="md:text-5xl text-2xl font-title text-blue leading-none">
                Ops!
              </h2>

              <p className="md:text-xl text-base">
                <strong>Esta quase lá!</strong> <br /> Você precisa do código do
                seu voucher, pode digita-lo abaixo.
              </p>

              <div className="md:px-0 px-6 flex flex-col gap-6">
                <FormValidate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
