import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { OrderService } from '../../services/order.service';
import { OrderModel } from '../../interfaces/order.interface';
import { useLocation } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Calendar } from 'primereact/calendar';
import { Messages } from 'primereact/messages';

const Order: React.FC = () => {
    const location = useLocation();
    const { product } = location.state;

    const [order, setOrder] = useState<OrderModel>({
        user: {
            name: "",
            phone: "",
            email: ""
        },
        product: product._id,
        quantity: 0,
        totalSum: 0,
        status: "נשלח לטיפול",
        date: new Date(Date.now()),
        note: ""
    });

    const setUserDetails = (e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent, field: string) => {
        const value = 'target' in e ? e.target.value : e.value;

        setOrder((prevOrder) => ({
            ...prevOrder,
            user: {
                ...prevOrder.user,
                [field]: value
            }
        }));
    };

    const setDate = (date: string) => {
        const value = date;

        setOrder((prevOrder) => ({
            ...prevOrder,
            date: new Date(value)
        }));
    };

    const calculateSum = (e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent, field: string) => {
        if ('target' in e) {
            const newQuantity = parseInt(e.target.value, 10);
            setOrder((prevOrder) => ({
                ...prevOrder,
                quantity: newQuantity,
                totalSum: newQuantity * product.price
            }));
        } else {
            const value = e.value ?? 0;
            setOrder((prevOrder) => ({
                ...prevOrder,
                quantity: value,
                totalSum: value * product.price
            }));
        }
    };

    const [showMessage, setShowMessage] = useState<{ type: string, text: string } | null>(null);

    const submitOrder = async () => {
        const res = await OrderService.addOrder(order);

        if (res) {
            setShowMessage({ type: 'success', text: 'ההזמנה נשמרה בהצלחה' });
        } else {
            setShowMessage({ type: 'error', text: 'שגיאה בשמירת ההזמנה' });
        }
    };


    const msgs = useRef<Messages>(null);

    useEffect(() => {
        if (msgs.current && showMessage) {
            msgs.current.clear();
            msgs.current.show({ id: '1', sticky: true, severity: showMessage.type === 'success' ? 'success' : 'error', summary: showMessage.type === 'success' ? 'נהדר! ' : 'אוי! ', detail: showMessage.text, closable: false });
        }
    }, [showMessage]);


    if (!product) {
        return (
            <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <p>טוען את פרטי המוצר</p>
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <div>
                <div className="p-field">
                    <label htmlFor="name">שם משתמש:</label>
                    <InputText id="name" value={order.user.name} onChange={(e) => setUserDetails(e, 'name')} />
                </div>
                <div className="p-field">
                    <label htmlFor="phone">טלפון:</label>
                    <InputText id="phone" value={order.user.phone} onChange={(e) => setUserDetails(e, 'phone')} />
                </div>
                <div className="p-field">
                    <label htmlFor="email">אימייל:</label>
                    <InputText id="email" value={order.user.email} onChange={(e) => setUserDetails(e, 'email')} />
                </div>
                <div className="card flex justify-content-center">
                    <label htmlFor="totalSum">ההזמנה לתאריך:</label>
                    <Calendar value={order.date} onChange={(e) => setDate(e.value!.toISOString())} />
                </div>
                <div className="p-field">
                    <label htmlFor="quantity">כמות:</label>
                    <InputNumber id="quantity" value={order.quantity} onChange={(e) => calculateSum(e, 'quantity')} />
                </div>
                <div className="p-field">
                    <label htmlFor="totalSum">סכום כולל:</label>
                    <InputNumber disabled id="totalSum" value={order.totalSum} />
                </div>
                {showMessage && (
                    <div className="card flex justify-content-center">
                        <Messages ref={msgs} />
                    </div>
                )}
                <Button label="שלח הזמנה" className="p-button-raised" onClick={submitOrder} />
            </div>
        </div>

    );
};

export default Order;