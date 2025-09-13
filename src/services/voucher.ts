import api from "./api";

export const voucherService = {
  getVoucher: (code: string) => api.get(`/voucher/${code}`),
  rescueVoucher: (code: string, data: any) =>
    api.post(`/voucher/${code}/rescue`, data),
};
