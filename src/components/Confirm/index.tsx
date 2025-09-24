import { AnimatePresence, motion } from "framer-motion";

type props = {
  isOpen?: boolean;
  data: any;
  onConfirm: (val: any) => void;
};
const ConfirmDialog = ({ isOpen, data, onConfirm }: props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="confirm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center gap-4"
        >
          <div className="bg-white p-4 rounded-2xl">
            <h3 className="py-4 border-b border-b-gray-300 md:text-2xl text-xl font-title text-blue leading-none mb-5">
              Para concluir o resgate, confirme os dados abaixo
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="md:text-xl text-base font-bold mb-2">
                  Dados pessoais:
                </h4>
                <p>
                  <strong>CPF: </strong>
                  {data.document}
                </p>
                <p>
                  <strong>Nome: </strong>
                  {data.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {data.email}
                </p>
              </div>
              <div>
                <h4 className="md:text-xl text-base font-bold mb-2">
                  Dados da entrega:
                </h4>

                <p>
                  <strong>CEP: </strong>
                  {data.zipcode}
                </p>
                <p>
                  <strong>Endereço: </strong>
                  {data.address}
                </p>
                <p>
                  <strong>Número: </strong>
                  {data.number}
                </p>
                <p>
                  <strong>Bairro: </strong>
                  {data.neighborhood}
                </p>
                <p>
                  <strong>Cidade / Estado: </strong>
                  {data.city}/{data.state}
                </p>
              </div>
            </div>

            <div className="border-t border-t-gray-300 py-4 mt-5 flex justify-end">
              <button
                onClick={() => onConfirm(data)}
                className="bg-yellow text-blue w-full md:w-auto  py-4 px-8 rounded hover:opacity-90 font-bold font-title"
              >
                Confirmar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
