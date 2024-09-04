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

const CustomerList: React.FC = () => {
    const [orders, setOrders] = useState<OrderModel[]>([]);
    useEffect(() => {
        OrderService.getOrders().then((data) => setOrders(data));
    }, []);

    const products = ProductService.getProducts();

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

    const onRowEditComplete = (rowData: OrderModel|any) => {
        // const updatedData = [...orders];
        // const index = updatedData.findIndex((item) => item._id === rowData._id);
        // updatedData[index] = { ...rowData };
        // setOrders(updatedData); // Update the state with the edited data

        OrderService.updateOrder(rowData._id!, rowData).then((updatedOrder) => {
            const updatedOrders = orders.map(order => order._id === updatedOrder._id ? updatedOrder : order);
            setOrders(updatedOrders);
            showSuccess();
        }).catch((error) => {
            showError();
            console.log(error);
            
        });
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
    const columns = [
        { field: 'user.name', header: 'שם הלקוח', type:'text',sort:true   },
        { field: 'user.phone', header: 'טלפון', type:'text',sort:false   },
        { field: 'user.email', header: 'אימייל', type:'text',sort:false   },
    ];

    return (
        <div style={{ direction: "rtl", textAlign: "right" , marginTop:"10px"}}>

            <Toast ref={toast} />
            {orders.length > 0 ? (
                <DynamicTable
                    list={orders}
                    columns={columns}
                    onRowEditComplete={onRowEditComplete}
                    handleDelete={handleDelete}
                    crud={[false, true, false, false]}
                />
            ) : (
                <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>לא נמצאו לקוחות במערכת. ניסיון חוזר...</p>
                    <p>טוען את פרטי ההזמנות</p>
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
};

export default CustomerList;
