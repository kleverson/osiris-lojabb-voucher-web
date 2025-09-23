import { useForm } from "react-hook-form";
import { useState } from "react";
import { voucherService } from "../../services/voucher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";

const FormValidate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await voucherService.getVoucher(values.voucher);

      if (data.id > 0) {
        navigate(`/${values.voucher}`);
      }
      console.log(data);
    } catch (error: unknown) {
      let message = "Ocorreu um erro";

      if (axios.isAxiosError(error)) {
        // erro do Axios
        if (error.response) {
          // resposta do servidor

          message = error.response.data?.msg || message;
          toast.error(message);
        } else if (error.request) {
          // sem resposta
          console.error("Sem resposta do servidor:", error.request);
          message = "Sem resposta do servidor";
        }
      } else {
        // erro genérico
        console.error("Erro desconhecido:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <div className="py-4 md:py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          {/* Nome */}
          <div className="flex-1">
            <label className="block mb-1 md:text-xl font-normal font-body text-base">
              Código do voucher
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded border-[#CECECE]"
              {...register("voucher", { required: "Código é obrigatório" })}
            />
            {errors.nome && (
              <ErrorMessage error={errors.nome.message as string} />
            )}
          </div>

          {errors.termos && (
            <ErrorMessage error={errors.termos.message as string} />
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue text-white px-6 py-4 text-base font-bold rounded-[4px] w-full md:w-auto transition-all"
            >
              {loading ? "Verificando..." : "Verificar voucher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormValidate;
