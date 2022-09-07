import {Product} from './Product';

export interface Category {
  id?: number;
  name?: string;
  image?: string;
  productList?: Product[];
  totalProduct?: number;
}
