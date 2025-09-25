import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { States } from "../../types/consts";
import { InputMask } from "@react-input/mask";
import { motion, AnimatePresence } from "framer-motion";
import { voucherService } from "../../services/voucher";
import type { VoucherEntity } from "../../types/voucher";
import ErrorMessage from "../ErrorMessage";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Loading/Spinner";
import ConfirmDialog from "../Confirm";
import { isValidDocument } from "../../util/fns";
import { toast } from "react-toastify";

type props = {
  codeVoucher: string;
  variation?: VoucherEntity | null;
  onUpdateStatus: (val?: string) => void;
  setOnConfirm: () => void;
};

const FormInfo = ({ codeVoucher, variation, setOnConfirm }: props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const [onConfirmData, setOnConfirmData] = useState(false);

  const [isPrivateVoucher, setIsPrivateVoucher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [formValues, setFormValues] = useState<any>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const handlerSubmit = async () => {
    setFormValues(null);
    setIsConfirm(false);
    setLoading(true);
    setIsSending(true);

    const rescueData = getValues();
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
      setIsSending(false);
      setTimeout(() => {
        navigate(`/${response.rescue.code}/success`);
      }, 300);
    } catch (e: any) {
      console.log("errror", e);
      toast.error(e.response.data.msg);
    } finally {
      setLoading(false);
      setIsSending(false);
    }
  };

  const onConfirm = async (rescueData: any) => {
    setOnConfirmData(true);
    setFormValues(rescueData);
    setOnConfirm();
  };

  const cepValue = watch("zipcode");

  useEffect(() => {
    const cepSemMascara = cepValue?.replace(/\D/g, "");
    if (cepSemMascara?.length === 8) {
      setCepLoading(true); // start loading
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
        .catch(() => console.error("Erro ao buscar o CEP"))
        .finally(() => setCepLoading(false)); // stop loading
    }
  }, [cepValue, setValue]);

  useEffect(() => {
    if (email) {
      setIsPrivateVoucher(true);
      setValue("email", email);
    }
  }, [email]);

  const inputClass = `w-full  p-2 rounded ${
    !onConfirmData ? "border border-[#CECECE]" : "border-none font-bold px-0"
  }`;

  return (
    <>
      <AnimatePresence>
        {cepLoading || isSending ? (
          <motion.div
            key="cep-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/70 flex flex-col items-center justify-center gap-4"
          >
            <Spinner type="primary" />
            <motion.span
              className="text-xl font-medium text-blue-700"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {isSending ? "Resgatando voucher..." : "Consultando Cep..."}
            </motion.span>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>

      <div className={`${!onConfirmData ? "py-10" : "py-0"}`}>
        {!onConfirmData && (
          <h3 className="font-title font-medium text-xl md:text-[32px]">
            Preencha com os dados de entrega
          </h3>
        )}

        <div className="py-4 md:py-10">
          <form
            onSubmit={handleSubmit(onConfirm)}
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
                      return isValidDocument(value);
                      // const cpfSemMascara = value?.replace(/\D/g, "");
                      // return (
                      //   cpfSemMascara?.length === 11 ||
                      //   "CPF deve ter 11 dígitos"
                      // );
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
                      readOnly={onConfirmData}
                      disabled={onConfirmData}
                      className={inputClass}
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
                  className={inputClass}
                  readOnly={onConfirmData}
                  disabled={onConfirmData}
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
                  disabled={isPrivateVoucher || onConfirmData}
                  readOnly={isPrivateVoucher || onConfirmData}
                  className={`w-full  p-2 rounded ${
                    isPrivateVoucher || onConfirmData
                      ? "border-none font-bold"
                      : "border border-[#CECECE]"
                  }`}
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
                      readOnly={onConfirmData}
                      disabled={onConfirmData}
                      className={inputClass}
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
                  readOnly={onConfirmData}
                  disabled={onConfirmData}
                  className={inputClass}
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
                  readOnly={onConfirmData}
                  disabled={onConfirmData}
                  className={inputClass}
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
                  readOnly={onConfirmData}
                  disabled={onConfirmData}
                  className={inputClass}
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
                  readOnly={onConfirmData}
                  disabled={onConfirmData}
                  className={inputClass}
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
                  className={inputClass}
                  disabled={onConfirmData}
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
            {!onConfirmData && (
              <>
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
              </>
            )}

            <div className="w-full border-b border-b[#CECECE] p-0 md:pb-10"></div>

            <div>
              {!onConfirmData ? (
                <button
                  type="submit"
                  className=" bg-yellow text-blue w-full md:w-auto  py-4 px-8 rounded hover:opacity-90 font-body font-title"
                >
                  Resgatar
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handlerSubmit}
                  className=" bg-yellow text-blue w-full md:w-auto  py-4 px-8 rounded hover:opacity-90 font-body font-title"
                >
                  {loading ? "Resgatando..." : "Confirmar resgate"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormInfo;
