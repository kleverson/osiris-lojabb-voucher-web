export interface VoucherEntity {
  id: number;
  id_voucher: number;
  id_produto: number;
  ativo: number;
  created: string;
  modified: string;
  bling_id: number;
  id_produto_pai: number;
  nome: string;
  descricao: string;
  codigo: string;
  categoria: string;
  tipo: string;
  situacao: string;
  formato: string;
  preco: number;
  peso: number;
  largura: number;
  altura: number;
  profundidade: number;
  data_evento?: Date;
  images: ImageEntity[];
}

export interface ImageEntity {
  url: string;
  image_id: string;
}
