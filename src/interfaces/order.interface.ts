export interface OrderModel {
    _id?: string;
    user:{
      name:string,
      phone: string,
      email: string
    };
    products: string;
    quantity: number;
    totalSum: number;
    status: string;
    date: Date;
}