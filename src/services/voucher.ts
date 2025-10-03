import axios from "axios";
import api from "./api";

export const voucherService = {
  getVoucher: (code: string) => api.get(`/voucher/${code}`),
  rescueVoucher: (code: string, data: any) => {
    return axios.post(
      `https://api.syscampanhapro.com.br/v1/vouchers/${code}/resgatar`,
      data
    );
  },
  checkOwnerVoucher: (code: string, body: any) =>
    api.post(`voucher/${code}/check-onwer`, body),
  checkVoucherByEmail: (email: string) =>
    api.post(`voucher/search-voucher`, { email: email }),
  checkStatus: (code: string) => api.get(`/voucher/${code}/status`),
  detailProduct: (code: string) => api.get(`/voucher/${code}/detail-product`),
};
