import api from "./api";

export const voucherService = {
  getVoucher: (code: string) => api.get(`/voucher/${code}`),
  rescueVoucher: (code: string, data: any, variationId?: number) => {
    if (variationId && variationId > 0) {
      return api.post(`/voucher/${code}/rescue/${variationId}`, data);
    } else {
      return api.post(`/voucher/${code}/rescue`, data);
    }
  },
  checkStatus: (code: string) => api.get(`/voucher/${code}/status`),
};
