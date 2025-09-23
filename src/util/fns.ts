export function isValidDocument(value: string) {
  const cpf = value?.replace(/\D/g, "");

  if (!cpf || cpf.length !== 11) {
    return "CPF deve ter 11 dígitos";
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return "CPF inválido";
  }

  const validarDigito = (cpf: string, pos: number) => {
    const soma = cpf
      .slice(0, pos)
      .split("")
      .reduce(
        (acc, curr, index) => acc + parseInt(curr) * (pos + 1 - index),
        0
      );
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const digito1 = validarDigito(cpf, 9);
  const digito2 = validarDigito(cpf, 10);

  if (digito1 !== parseInt(cpf[9]) || digito2 !== parseInt(cpf[10])) {
    return "CPF inválido";
  }

  return true;
}
