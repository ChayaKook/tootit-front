// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
// import { OrderService } from '../../services/order.service';
// import { OrderModel } from '../../interfaces/order.interface';
// import { useLocation } from 'react-router-dom';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Calendar } from 'primereact/calendar';
// import { Messages } from 'primereact/messages';
// import { Editor, EditorTextChangeEvent } from "primereact/editor";
// import { Toast } from 'primereact/toast';
// import Product from '../product/product.component';
// import { Steps } from 'primereact/steps';
// import { MenuItem } from 'primereact/menuitem';

// const Order: React.FC = () => {
//     const location = useLocation();
//     const { product } = location.state;

//     const [order, setOrder] = useState<OrderModel>({
//         user: {
//             name: "gershi",
//             phone: "cohen",
//             email: "gc987789@gmail.com"
//         },
//         product: product._id,
//         quantity: 10,
//         totalSum: 0,
//         status: "נשלח לטיפול",
//         date: new Date(Date.now()),
//         note: "VXV"
//     });

//     const setUserDetails = (e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent, field: string) => {
//         const value = 'target' in e ? e.target.value : e.value;

//         setOrder((prevOrder) => ({
//             ...prevOrder,
//             user: {
//                 ...prevOrder.user,
//                 [field]: value
//             }
//         }));
//     };

//     const setOrderDetails = (value: string | null, field: string) => {

//         setOrder((prevOrder) => ({
//             ...prevOrder,
//             [field]: field === "date" ? new Date(value!) : value
//         }));
//     };

//     const calculateSum = (e: React.ChangeEvent<HTMLInputElement> | InputNumberChangeEvent, field: string) => {
//         if ('target' in e) {
//             const newQuantity = parseInt(e.target.value, 10);
//             setOrder((prevOrder) => ({
//                 ...prevOrder,
//                 quantity: newQuantity,
//                 totalSum: newQuantity * product.price
//             }));
//         } else {
//             const value = e.value ?? 0;
//             setOrder((prevOrder) => ({
//                 ...prevOrder,
//                 quantity: value,
//                 totalSum: value * product.price
//             }));
//         }
//     };

//     const [showMessage, setShowMessage] = useState<{ type: string, text: string } | null>(null);

//     const submitOrder = async () => {
//         const res = await OrderService.addOrder(order);

//         if (res) {
//             // setShowMessage({ type: 'success', text: 'ההזמנה נשמרה בהצלחה' });
//             showSuccess();
//         } else {
//             // setShowMessage({ type: 'error', text: 'שגיאה בשמירת ההזמנה' });
//             showError();
//         }
//     };


//     // const msgs = useRef<Messages>(null);

//     // useEffect(() => {
//     //     if (msgs.current && showMessage) {
//     //         msgs.current.clear();
//     //         msgs.current.show({ id: '1', sticky: true, severity: showMessage.type === 'success' ? 'success' : 'error', summary: showMessage.type === 'success' ? 'נהדר! ' : 'אוי! ', detail: showMessage.text, closable: false });
//     //     }
//     // }, [showMessage]);

//     const toast = useRef<Toast>(null);

//     const showSuccess = () => {
//         toast.current?.show({ severity: 'success', summary: 'נהדר! ', detail: ' ההזמנה נשמרה בהצלחה', life: 3000 });
//     }

//     const showError = () => {
//         toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: ' ארעה שגיאה בשמירת ההזמנה, אנא נסו שנית', life: 3000 });
//     }


//     if (!product) {
//         return (
//             <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                 <p>טוען את פרטי המוצר</p>
//                 <ProgressSpinner />
//             </div>
//         );
//     }



//     return (
//         <div style={{ display: "flex", flexDirection: "row", top: "10px", alignContent: "flex-start" }}>

//             <Product data={product} sale={true}></Product>
//             <Toast ref={toast} />
//             <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#f6f9ff", borderRadius: "10%" }}>
//                 <div id="userDetails">
//                     <div className="p-field">
//                         <label htmlFor="name">שם משתמש:</label>
//                         <InputText id="name" value={order.user.name} onChange={(e) => setUserDetails(e, 'name')} />
//                     </div>
//                     <div className="p-field">
//                         <label htmlFor="phone">טלפון:</label>
//                         <InputText id="phone" value={order.user.phone} onChange={(e) => setUserDetails(e, 'phone')} />
//                     </div>
//                     <div className="p-field">
//                         <label htmlFor="email">אימייל:</label>
//                         <InputText id="email" value={order.user.email} onChange={(e) => setUserDetails(e, 'email')} />
//                     </div>
//                 </div>
//                 <div id='orderDetails'>
//                     <div className="card flex justify-content-center">
//                         <label htmlFor="totalSum">ההזמנה לתאריך:</label>
//                         <Calendar showTime hourFormat="24" value={order.date} onChange={(e) => setOrderDetails(e.value!.toISOString(), 'date')} />
//                     </div>
//                     <div className="p-field">
//                         <label htmlFor="quantity">כמות:</label>
//                         <InputNumber id="quantity" value={order.quantity} onChange={(e) => calculateSum(e, 'quantity')} />
//                     </div>
//                     <div className="p-field">
//                         <label htmlFor="totalSum">סכום כולל:</label>
//                         <InputNumber disabled id="totalSum" value={order.totalSum} />
//                     </div>
//                 </div>
//                 <div id='addNoteANdSubmit'>
//                     <div className="card">
//                         <label htmlFor="totalSum">הוסף הערה לבעל העסק: </label>
//                         <Editor value={order.note} onTextChange={(e: EditorTextChangeEvent) => setOrderDetails(e.htmlValue, 'note')} style={{ height: '320px' }} />
//                     </div>
//                     <Button label="שלח הזמנה" className="p-button-raised" onClick={submitOrder} />

//                 </div>
//             </div>

//         </div>

//     );
// };

// export default Order;


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
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Toast } from 'primereact/toast';
import Product from '../product/product.component';
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';

const Order: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const location = useLocation();
    const { product } = location.state;

    const [order, setOrder] = useState<OrderModel>({
        user: {
            name: "gershi",
            phone: "cohen",
            email: "gc987789@gmail.com"
        },
        product: product._id,
        quantity: 10,
        totalSum: 0,
        status: "נשלח לטיפול",
        date: new Date(Date.now()),
        note: "VXV"
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

    const setOrderDetails = (value: string | null, field: string) => {

        setOrder((prevOrder) => ({
            ...prevOrder,
            [field]: field === "date" ? new Date(value!) : value
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
            // setShowMessage({ type: 'success', text: 'ההזמנה נשמרה בהצלחה' });
            showSuccess();
        } else {
            // setShowMessage({ type: 'error', text: 'שגיאה בשמירת ההזמנה' });
            showError();
        }
    };


    // const msgs = useRef<Messages>(null);

    // useEffect(() => {
    //     if (msgs.current && showMessage) {
    //         msgs.current.clear();
    //         msgs.current.show({ id: '1', sticky: true, severity: showMessage.type === 'success' ? 'success' : 'error', summary: showMessage.type === 'success' ? 'נהדר! ' : 'אוי! ', detail: showMessage.text, closable: false });
    //     }
    // }, [showMessage]);

    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'נהדר! ', detail: ' ההזמנה נשמרה בהצלחה', life: 3000 });
    }

    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: ' ארעה שגיאה בשמירת ההזמנה, אנא נסו שנית', life: 3000 });
    }


    if (!product) {
        return (
            <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <p>טוען את פרטי המוצר</p>
                <ProgressSpinner />
            </div>
        );
    }

    const itemRenderer = (item: any, itemIndex: number) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
                onClick={() => setActiveIndex(itemIndex)}
            >
                <i className={`${item.icon} text-xl`} />
            </span>
        );
    };

    const items: MenuItem[] = [
        {
            icon: 'pi pi-user',
            template: (item) => itemRenderer(item, 0),
            //     <div id="userDetails">{
            //     <div id="userDetails">
            //         <div className="p-field">
            //             <label htmlFor="name">שם משתמש:</label>
            //             <InputText id="name" value={order.user.name} onChange={(e) => setUserDetails(e, 'name')} />
            //         </div>
            //         <div className="p-field">
            //             <label htmlFor="phone">טלפון:</label>
            //             <InputText id="phone" value={order.user.phone} onChange={(e) => setUserDetails(e, 'phone')} />
            //         </div>
            //         <div className="p-field">
            //             <label htmlFor="email">אימייל:</label>
            //             <InputText id="email" value={order.user.email} onChange={(e) => setUserDetails(e, 'email')} />
            //         </div>
            //     </div>
            // }</div>
        },
        {
            icon: 'pi pi-calendar',
            template: (item) => itemRenderer(item, 1),
            //     <div id="orderDetails">{
            //     <div id='orderDetails'>
            //         <div className="card flex justify-content-center">
            //             <label htmlFor="totalSum">ההזמנה לתאריך:</label>
            //             <Calendar showTime hourFormat="24" value={order.date} onChange={(e) => setOrderDetails(e.value!.toISOString(), 'date')} />
            //         </div>
            //         <div className="p-field">
            //             <label htmlFor="quantity">כמות:</label>
            //             <InputNumber id="quantity" value={order.quantity} onChange={(e) => calculateSum(e, 'quantity')} />
            //         </div>
            //         <div className="p-field">
            //             <label htmlFor="totalSum">סכום כולל:</label>
            //             <InputNumber disabled id="totalSum" value={order.totalSum} />
            //         </div>
            //     </div>
            // }</div>
        },
        {
            icon: 'pi pi-check',
            template: (item) => itemRenderer(item, 2),
            // <div id="addNoteANdSubmit">{
            //     <div id='addNoteANdSubmit'>
            //         <div className="card">
            //             <label htmlFor="totalSum">הוסף הערה לבעל העסק: </label>
            //             <Editor value={order.note} onTextChange={(e: EditorTextChangeEvent) => setOrderDetails(e.htmlValue, 'note')} style={{ height: '320px' }} />
            //         </div>
            //         <Button label="שלח הזמנה" className="p-button-raised" onClick={submitOrder} />

            //     </div>
            // }</div>
        }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "row", top: "10px", alignContent: "flex-start" }}>

            <Product data={product} sale={true}></Product>
            <Toast ref={toast} />
            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#f6f9ff", borderRadius: "10%", margin: "50px" , padding:"25px"}}>
                {/* <div className="card">
                    <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" />
                </div> */}
                <div id="userDetails">
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
                </div>
                <div id='orderDetails'>
                    <div className="card flex justify-content-center">
                        <label htmlFor="totalSum">ההזמנה לתאריך:</label>
                        <Calendar showTime hourFormat="24" value={order.date} onChange={(e) => setOrderDetails(e.value!.toISOString(), 'date')} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="quantity">כמות:</label>
                        <InputNumber id="quantity" value={order.quantity} onChange={(e) => calculateSum(e, 'quantity')} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="totalSum">סכום כולל:</label>
                        <InputNumber disabled id="totalSum" value={order.totalSum} />
                    </div>
                </div>
                <div id='addNoteANdSubmit'>
                    <div className="card">
                        <label htmlFor="totalSum">הוסף הערה לבעל העסק: </label>
                        <Editor value={order.note} onTextChange={(e: EditorTextChangeEvent) => setOrderDetails(e.htmlValue, 'note')} style={{ height: '320px' }} />
                    </div>
                    <Button label="שלח הזמנה" className="p-button-raised" onClick={submitOrder} />
                </div>
            </div>
        </div>
    );
};

export default Order;
