// export default OrdersList;
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import DynamicTable from '../generic-table/table.component';
import { OrderModel } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { ProductModel } from '../../interfaces/product.interface';
import ProductService from '../../services/product.service';
import { Button } from 'primereact/button';
import { ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';

const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<OrderModel[]>([]);
    useEffect(() => {
        OrderService.getOrders().then((data) => setOrders(data));
    }, []);

    const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => {
        ProductService.getProducts().then((data: React.SetStateAction<ProductModel[]>) => setProducts(data));
    }, []);

    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'נהדר! ', detail: 'עדכון הנתונים הושלם בהצלחה', life: 3000 });
    }

    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: ' ארעה שגיאה בשמירת הנתונים, אנא נסו שנית', life: 3000 });
    }

    const getProduct = (id: string) => {
        ProductService.getProduct(id).then((data) => {
            return data;
        })
    }

    // const allowEdit = (rowData: ProductModel) => {
    //     return rowData.name !== 'Blue Band';
    // };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const onRowEditComplete = (rowData: OrderModel) => {
        // const updatedData = [...orders];
        // const index = updatedData.findIndex((item) => item._id === rowData._id);
        // updatedData[index] = { ...rowData };
        // setOrders(updatedData); // Update the state with the edited data
        if (rowData._id)
            OrderService.updateOrder(rowData._id, rowData).then((updatedOrder) => {
                const updatedOrders = orders.map(order => order._id === updatedOrder._id ? updatedOrder : order);
                setOrders(updatedOrders);
                showSuccess();
            }).catch((error) => {
                showError();
                console.log(error);
            });
        else {
            showError();
            console.log("מזהה ההזמנה לא נקלט" + rowData);

        }
    };

    const printThisOreder = () => {
        window.print()
    }

    function handleDelete(id: any): void {
        if (id)
            OrderService.deleteOrder(id).then((data: any) => {
                setOrders(orders.filter((order) => order._id !== id));
                showSuccess()

            }).catch((error) => {
                showError()
            })
        else {
            toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: 'לא נמצא מזהה להזמנה', life: 3000 });

        }
    }

    const addOreder = (order: OrderModel | any) => {
        try {
            delete order._id
            order.status = "הוזמן באמצאות טאב מנהל"
            const newItem = OrderService.addOrder(order);
            setOrders([...orders, order]);
            showSuccess();
            return newItem;
        } catch (error) {
            showError();
            console.log(error);
        }
    }

    const columns = [
        { field: '_id', header: 'מזהה הזמנה', type: 'text', sort: false }, 
        {
            field: 'user', 
            fieldsList: [{ field: 'user.name', header: 'שם הלקוח', type: 'text', sort: true, toShow: true },
            { field: 'user.phone', header: 'טלפון', type: 'text', sort: false, toShow: true },
            { field: 'user.email', header: 'אימייל', type: 'text', sort: false, toShow: true }]
        },
        {
            field: "product", 
            fieldsList: [{ field: 'product.name', header: 'פריט', type: 'product', sort: true, toShow: true },
            { field: 'product._id', header: 'פריט', type: 'product', sort: true, toShow: false }]
        },
        { field: 'quantity', header: 'כמות פריטים', type: 'number', sort: false },
        { field: 'totalSum', header: 'סכום לתשלום', type: 'number', sort: true },
        { field: 'date', header: 'תאריך אספקה', type: 'date', sort: true },
        { field: 'note', header: 'הערות הלקוח', type: 'text', sort: false },
        { field: 'status', header: 'סטטוס', type: 'text', sort: true }

    ];

    return (
        <div style={{ direction: "rtl", textAlign: "right", marginTop: "10px" }}>

            <Toast ref={toast} />
            {orders.length > 0 ? (
                <DynamicTable
                    list={orders}
                    columns={columns}
                    addItem={addOreder}
                    onRowEditComplete={onRowEditComplete}
                    handleDelete={handleDelete}
                    crud={[true, true, true, true]}

                />
            ) : (
                <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>לא נמצאו הזמנות במערכת. ניסיון חוזר...</p>
                    <p>טוען את פרטי ההזמנות</p>
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
};

export default OrdersList;
