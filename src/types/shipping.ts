export interface Shipping {
  product: Product;
  shipping: Shipping;
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
  data_evento: string;
  created: string;
  modified: string;
  images: Image[];
}

export interface Image {
  url: string;
  image_id: string;
}

export interface Shipping {
  name: string;
  email: string;
  address: Address;
  delivery_estimated: string;
  trackingUrl: string;
}

export interface Address {
  nome: string;
  endereco: string;
  numero: string;
  complemento: string;
  municipio: string;
  uf: string;
  cep: string;
  bairro: string;
  nomePais: string;
}
