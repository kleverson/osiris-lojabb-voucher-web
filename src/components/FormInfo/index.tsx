import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { States } from "../../types/consts";
import { InputMask } from "@react-input/mask";
import { voucherService } from "../../services/voucher";
import type { VoucherEntity } from "../../types/voucher";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";

type props = {
  codeVoucher: string;
  variation?: VoucherEntity;
  onUpdateStatus: (val?: string) => void;
};

const FormInfo = ({ codeVoucher, variation, onUpdateStatus }: props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (rescueData: any) => {
    setLoading(true);
    try {
      const cleanedData = {
        ...rescueData,
        document: rescueData.document?.replace(/\D/g, ""),
        zipcode: rescueData.zipcode?.replace(/\D/g, ""),
      };
      const { data: response } = await voucherService.rescueVoucher(
        codeVoucher,
        cleanedData,
        variation?.id
      );
      navigate(`/${response.rescue.code}/status`);
    } catch (e) {
      console.log("[error]", e);
    } finally {
      setLoading(false);
    }
  };

  const cepValue = watch("zipcode");

  useEffect(() => {
    const cepSemMascara = cepValue?.replace(/\D/g, "");
    if (cepSemMascara?.length === 8) {
      fetch(`https://brasilapi.com.br/api/cep/v2/${cepSemMascara}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data?.errors) {
            setValue("address", data.street || "");
            setValue("neighborhood", data.neighborhood || "");
            setValue("city", data.city || "");
            setValue("state", data.state || "");
          }
        })
        .catch(() => console.error("Erro ao buscar o CEP"));
    }
  }, [cepValue, setValue]);

  return (
    <div className="py-10">
      <h3 className="font-title font-medium text-xl md:text-[32px]">
        Precisamos de algumas informações
      </h3>

      <div className="py-4 md:py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-6">
            {/* CPF */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                CPF
              </label>
              <Controller
                name="document"
                control={control}
                rules={{
                  required: "CPF é obrigatório",
                  validate: (value) => {
                    const cpfSemMascara = value?.replace(/\D/g, "");
                    return (
                      cpfSemMascara?.length === 11 || "CPF deve ter 11 dígitos"
                    );
                  },
                }}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="___.___.___-__"
                    replacement={{ _: /[0-9]/ }} // Aceita qualquer dígito 0-9
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="w-full border p-2 rounded border-[#CECECE]"
                    placeholder="000.000.000-00"
                  />
                )}
              />
              {errors.document && (
                <ErrorMessage error={errors.document.message as string} />
              )}
            </div>

            {/* Nome */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Nome
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && (
                <ErrorMessage error={errors.name.message as string} />
              )}
            </div>

            {/* Email */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Email
              </label>
              <input
                type="email"
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <ErrorMessage error={errors.email.message as string} />
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-6">
            {/* CEP */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                CEP
              </label>
              <Controller
                name="zipcode"
                control={control}
                rules={{
                  required: "CEP é obrigatório",
                  validate: (value) => {
                    const cepSemMascara = value?.replace(/\D/g, "");
                    return (
                      cepSemMascara?.length === 8 || "CEP deve ter 8 dígitos"
                    );
                  },
                }}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="_____-___"
                    replacement={{ _: /[0-9]/ }} // Aceita qualquer dígito 0-9
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="w-full border p-2 rounded border-[#CECECE]"
                    placeholder="00000-000"
                  />
                )}
              />
              {errors.zipcode && (
                <ErrorMessage error={errors.zipcode.message as string} />
              )}
            </div>

            {/* Endereço */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Endereço
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("address", {
                  required: "Endereço é obrigatório",
                })}
              />
              {errors.address && (
                <ErrorMessage error={errors.address.message as string} />
              )}
            </div>

            {/* Número */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Número
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("number", { required: "Número é obrigatório" })}
              />
              {errors.number && (
                <ErrorMessage error={errors.number.message as string} />
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-between gap-4 md:gap-6">
            {/* Bairro */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Bairro
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("neighborhood", {
                  required: "Bairro é obrigatório",
                })}
              />
              {errors.neighborhood && (
                <ErrorMessage error={errors.neighborhood.message as string} />
              )}
            </div>

            {/* Cidade */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Cidade
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("city", { required: "Cidade é obrigatória" })}
              />
              {errors.city && (
                <ErrorMessage error={errors.city.message as string} />
              )}
            </div>

            {/* Estado */}
            <div className="flex-1">
              <label className="block mb-1 md:text-xl font-normal font-body text-base">
                Estado
              </label>
              <select
                className="w-full border p-2 rounded border-[#CECECE]"
                {...register("state", { required: "Estado é obrigatório" })}
              >
                <option value="">Selecione</option>
                {States.map((item, index: number) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </select>
              {errors.state && (
                <ErrorMessage error={errors.state.message as string} />
              )}
            </div>
          </div>

          {/* Termos */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              {...register("termos", {
                required: "Você deve aceitar os termos",
              })}
            />
            <label className="text-sm">
              Declaro ter lido e concordado com os termos do{" "}
              <a
                href="http://google.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue text-underline font-bold"
              >
                regulamento
              </a>
              .
            </label>
          </div>
          {errors.termos && (
            <ErrorMessage error={errors.termos.message as string} />
          )}

          <div className="w-full border-b border-b[#CECECE] p-0 md:pb-10"></div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className=" bg-yellow text-blue w-full md:w-auto  py-4 px-8 rounded hover:opacity-90 font-body font-title"
            >
              {loading ? "Resgatando..." : "Resgatar mimo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInfo;
