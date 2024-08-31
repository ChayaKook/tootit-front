import { OrderModel } from "../interfaces/order.interface";

const API = "http://localhost:8080"


export const OrderService = {

    addOrder: async (order: OrderModel): Promise<OrderModel|any> => {

        try {
            const response = await fetch(`${API}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            })
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            
        }

    },
}