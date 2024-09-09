export interface OrderModel {
    _id?: string;
    user:{
      name:string,
      phone: string,
      email: string
    };
    product: {_id:string, name:string};
    quantity: number;
    totalSum: number;
    status: string;
    date: Date;
    note: string;
}
