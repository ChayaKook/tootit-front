import { OrderModel } from "../interfaces/order.interface";

const API = "http://localhost:8080"


export const OrderService = {

    addOrder: async (order: OrderModel): Promise<OrderModel | any> => {

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

    getOrders: async (): Promise<OrderModel[] | any> => {

        try {
            
            const response = await fetch(`${API}/orders`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            })
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    updateOrder: async (orderId:string, order:OrderModel): Promise<OrderModel[] | any> => {

        try {
            console.log(orderId);

            const response = await fetch(`${API}/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            })
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    deleteOrder: async (orderId:string): Promise<OrderModel | any> => {

        try {
            const response = await fetch(`${API}/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            })
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
        }
    },
}