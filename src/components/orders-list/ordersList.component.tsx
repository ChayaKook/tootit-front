// import React, { useEffect, useRef, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column, ColumnEditorOptions } from 'primereact/column';
// import { OrderService } from '../../services/order.service';
// import { OrderModel } from '../../interfaces/order.interface';
// import { ProductModel } from '../../interfaces/product.interface';
// import ProductService from '../../services/product.service';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { ProgressSpinner } from 'primereact/progressspinner';
// import { Toast } from 'primereact/toast';
// const OrdersList: React.FC = () => {
//     const [orders, setOrders] = useState<OrderModel[]>([]);
//     useEffect(() => {
//         OrderService.getOrders().then((data) => setOrders(data));
//     }, []);

//     const products = ProductService.getProducts();

//     const toast = useRef<Toast>(null);

//     const showSuccess = () => {
//         toast.current?.show({ severity: 'success', summary: 'נהדר! ', detail: 'עדכון הנתונים הושלם בהצלחה', life: 3000 });
//     }

//     const showError = () => {
//         toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: ' ארעה שגיאה בשמירת הנתונים, אנא נסו שנית', life: 3000 });
//     }

//     const getProduct = (id: string) => {
//         ProductService.getProduct(id).then((data) => {
//             return data;

//         })
//     }
//     const allowEdit = (rowData: ProductModel) => {
//         return rowData.name !== 'Blue Band';
//     };

//     const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
//     const paginatorRight = <Button type="button" icon="pi pi-download" text />;

//     const textEditor = (options: ColumnEditorOptions) => {
//         return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
//     };

//     const onRowEditComplete = () => {
//         // OrderService.updateOrder
//     }

//     const printThisOreder = () => {
//         window.print()
//     }




//     function handleDelete(id: any): void {
//         if (id)
//             OrderService.deleteOrder(id).then((data: any) => {
//                 setOrders(orders.filter((order) => order._id !== id));
//                 showSuccess()

//             }).catch((error) => {
//                 showError()
//             })
//         else {
//             toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: 'לא נמצא מזהה להזמנה', life: 3000 });

//         }
//     }

//     return (
//         <div style={{ direction: "rtl", textAlign: "right" }}>

//             <div>
//                 <Button icon="pi pi-plus" rounded aria-label="info" />
//             </div>

//             <Toast ref={toast} />

//             <div className="card">
//                 {orders.length > 0 ? (
//                     <DataTable id="tableProducts" stripedRows paginator rows={5} rowsPerPageOptions={[5, 8, 12, 16]} value={orders} style={{ textAlign: "right", direction: "rtl" }}
//                         paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
//                         currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
//                         editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} >
//                         <Column field="_id" header="מזהה הזמנה" style={{ textAlign: "right" }}></Column>
//                         <Column field="user.name" sortable header="שם הלקוח" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="user.phone" header="טלפון" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="user.email" header="אימייל" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="product" sortable header="פריט" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="quantity" sortable header="כמות פריטים" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="totalSum" sortable header="סכום לתשלום" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="date" sortable header="תאריך אספקה" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column field="note" header="הערות הלקוח" style={{ textAlign: "right" }} editor={(options) => textEditor(options)}></Column>
//                         <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

//                         <Column headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}
//                             body={(rowData) => (
//                                 <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData._id)} />
//                             )}
//                         ></Column>

//                     </DataTable>
//                 ) : (
//                     <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                         <p>לא נמצאו הזמנות במערכת. ניסיון חוזר...</p>
//                         <p>טוען את פרטי ההזמנות</p>
//                         <ProgressSpinner />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );

// }

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
// sortable
    const columns = [
        { field: '_id', header: 'מזהה הזמנה', type:'text',sort:false },
        { field: 'user.name', header: 'שם הלקוח', type:'text',sort:true   },
        { field: 'user.phone', header: 'טלפון', type:'text',sort:false   },
        { field: 'user.email', header: 'אימייל', type:'text',sort:false   },
        { field: 'product', header: 'פריט', type:'text' ,sort:true  },
        { field: 'quantity', header: 'כמות פריטים', type:'number' ,sort:false  },
        { field: 'totalSum', header: 'סכום לתשלום' , type:'number',sort:true  },
        { field: 'date', header: 'תאריך אספקה', type:'date' ,sort:true  },
        { field: 'note', header: 'הערות הלקוח', type:'text' ,sort:false  }
    ];

    return (
        <div style={{ direction: "rtl", textAlign: "right", marginTop:"10px" }}>

            <Toast ref={toast} />
            {orders.length > 0 ? (
                <DynamicTable
                    list={orders}
                    columns={columns}
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
