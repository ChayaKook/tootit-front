import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProductModel } from '../../interfaces/product.interface';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../interfaces/order.interface';
import { useLocation } from 'react-router-dom';

import { ProgressSpinner } from 'primereact/progressspinner';

const Order: React.FC = () => {

    const location = useLocation();
    const { product } = location.state;


    const [order, setOrder] = useState<OrderModel>({
        user: {
            name: "",
            phone: "",
            email: ""
        },
        products: product.id!,
        quantity: 0,
        totalSum: 0,
        status: "נשלח לטיפול",
        date: new Date(Date.now())
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent, field: string) => {
        const value = 'target' in e ? e.target.value : e.value;
    
        setOrder((prevOrder) => ({
            ...prevOrder,
            [field]: value
        }));

    };
    

    const calculateSum = (e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent, field: string) => {
        if ('target' in e) {
            const newQuantity = parseInt(e.target.value, 10);
            setOrder({ ...order, [field]: newQuantity, totalSum: newQuantity * product.price });
        } else {
            const value = e.value ?? 0; // Add null check here
            setOrder({ ...order, [field]: value, totalSum: value * product.price });
        }
    };
    
    

    const submitOrder = () => {
        alert("אנא המתן")
        const res = OrderService.addOrder(order);
        console.log(order);
    };

    if (!product) {
        return <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <p>טוען את פרטי המוצר</p>
            <ProgressSpinner />
        </div>;
    }
    return (
        <div>
            <h1>{product.name}</h1>
            <div>
                <div className="p-field">
                    <label htmlFor="name">שם משתמש:</label>
                    <InputText id="name" value={order.user.name} onChange={(e) => handleInputChange(e, 'user.name')} />
                </div>
                <div className="p-field">
                    <label htmlFor="phone">טלפון:</label>
                    <InputText id="phone" value={order.user.phone} onChange={(e) => handleInputChange(e, 'user.phone')} />
                </div>
                <div className="p-field">
                    <label htmlFor="email">אימייל:</label>
                    <InputText id="email" value={order.user.email} onChange={(e) => handleInputChange(e, 'user.email')} />
                </div>
                <div className="p-field">
                    <label htmlFor="quantity">כמות:</label>
                    <InputNumber id="quantity" value={order.quantity} onChange={(e) => calculateSum(e, 'quantity')} />
                </div>
                <div className="p-field">
                    <label htmlFor="totalSum">סכום כולל:</label>
                    <InputNumber disabled id="totalSum" value={order.totalSum} />
                </div>
                <Button label="שלח הזמנה" className="p-button-raised" onClick={submitOrder} />
            </div>
        </div>

    );
};

export default Order;

