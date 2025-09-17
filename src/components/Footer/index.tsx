const Footer = () => {
  return (
    <footer>
      <div className="bg-yellow">
        <div className="container py-9 mx-auto font-body">
          <div className="w-[90%] md:w-[80%] mx-auto">
            <div className="flex flex-col items-start md:flex-row justify-between md:items-center">
              <div className="flex flex-col md:flex-row gap-12">
                <p className="flex items-center text-sm font-light font-body gap-[2px] text-[#333333]">
                  <svg
                    width="22"
                    height="25"
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 0.5C6.398 0.5 1.61133 1.53711 1.61133 1.53711L1.60742 1.54102C1.15448 1.63169 0.746886 1.87635 0.453872 2.23345C0.160857 2.59055 0.000486868 3.03807 0 3.5V9.5C0 19.898 10.0215 24.2441 10.0215 24.2441C10.3203 24.4119 10.6573 24.5 11 24.5C11.3414 24.4993 11.6769 24.4112 11.9746 24.2441H11.9785C11.9785 24.2441 22 19.898 22 9.5V3.5C22.0002 3.03685 21.8397 2.58797 21.5459 2.22999C21.252 1.87201 20.843 1.62712 20.3887 1.53711C20.3887 1.53711 15.602 0.5 11 0.5Z"
                      fill="#333333"
                    />
                  </svg>
                  Ambiente 100% seguro
                </p>

                <p className="text-xs font-body font-light">
                  Whatsapp <br />
                  <span className="text-blue text-base">(11) 991967-4169</span>
                </p>

                <p className="text-xs font-body font-light">
                  E-mail <br />
                  <a
                    href="mailto:sac.produtos@emaragon.com.br"
                    className="text-blue text-base"
                  >
                    sac.produtos@emaragon.com.br
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-8 border-t border-t-blue md:border-none mt-6 pt-6 md:mt-0 md:pt-0">
                <img src="/imgs/brand_emaragon.png" alt="" />
                <div className="border-l border-l-blue h-8"></div>
                <img src="/imgs/brand_bb.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue">
        <div className="container py-4 mx-auto font-body">
          <div className="w-[90%] md:w-[80%] mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5  justify-between text-xs text-[#ffffff]">
              <div className="flex flex-1 flex-col md:flex-row  gap-5 ">
                <span>
                  EMARANGON BRINDES PROMOCIONAIS LTDA <br /> CNPJ
                  17.921.797/0001-62
                </span>
                <span>
                  Esta plataforma opera com direito de uso da marca
                  <br /> Loja BB autorizada pelo Banco do Brasil.​
                </span>
              </div>

              <ul className="grid grid-cols-2 md:flex text-xs items-center w-full flex-col md:flex-row text-[#ffffff] flex-1 justify-end">
                <li>
                  <a href="" className="px-[10px]">
                    Troca e devolução
                  </a>
                </li>
                <li>
                  <a href="" className="px-[10px]">
                    Políticas de uso e Privacidade
                  </a>
                </li>
                <li>
                  <a href="" className="px-[10px]">
                    Suporte técnico
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
