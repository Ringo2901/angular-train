export interface ProductModel {
  id: number;
  image: string;
  title: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  price: number;
}
