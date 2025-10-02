export interface Products {
  voucher_id: number;
  totalItens: number;
  products: Product[];
  usado?: boolean;
}

export interface Product {
  id: number;
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
  data_evento: Date | null;
  created: string;
  modified: string;
  images: Image[];
  sizes?: Size[];
}

export interface Image {
  url: string;
  image_id: string;
}

export interface Size {
  id: number;
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
  data_evento?: string;
  created: string;
  modified: string;
  images: Image[];
}
