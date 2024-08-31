export interface OrderModel {
    _id?: string;
    user:{
      name:string,
      phone: string,
      email: string
    };
    product: string;
    quantity: number;
    totalSum: number;
    status: string;
    date: Date;
    note: string;
}
