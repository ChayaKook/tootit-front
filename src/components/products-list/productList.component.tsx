// export default productsList;
import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import DynamicTable from '../generic-table/table.component';
import { OrderModel } from '../../interfaces/order.interface';
import { ProductModel } from '../../interfaces/product.interface';
import ProductService from '../../services/product.service';
import { Button } from 'primereact/button';
import { ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProductsList: React.FC = () => {
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
    const printThisOreder = () => {
        window.print()
    }

    const onRowEditComplete = (rowData: OrderModel|any) => {
        
        ProductService.updateProduct(rowData).then((updatedProduct) => {
            const updatePproduct = products.map(p => p._id === updatedProduct._id ? updatedProduct : p);
            setProducts(updatePproduct);
            showSuccess();
        }).catch((error) => {
            showError();
            console.log(error);
            
        });
    };

    function handleDelete(id: any): void {
        if (id)
            ProductService.deleteProduct(id).then((data: any) => {
                setProducts(products.filter((product) => product._id !== id));
                showSuccess()

            }).catch((error) => {
                showError()
            })
        else {
            toast.current?.show({ severity: 'error', summary: 'שגיאה! ', detail: 'לא נמצא מזהה להזמנה', life: 3000 });

        }
    }

    const columns = [
        { field: '_id', header: 'מזהה מוצר', type:'text',sort:false   },
        { field: 'name', header: 'שם', type:'text',sort:true   },
        { field: 'description', header: 'תיאור', type:'text',sort:false   },
        { field: 'image', header: 'תמונה', type:'text',sort:false   },
        { field: 'price', header: 'מחיר', type:'number',sort:true   },
        { field: 'category', header: 'קטגוריה', type:'text',sort:true   },
        // { field: 'inventoryStatus', header: 'סטטוס מלאי', type:'text',sort:true   },

    ];

    return (
        <div style={{ direction: "rtl", textAlign: "right", marginTop:"10px" }}>
            <Toast ref={toast} />

            {products.length > 0 ? (
                <DynamicTable
                    list={products}
                    columns={columns}
                    onRowEditComplete={onRowEditComplete}
                    handleDelete={handleDelete}
                    crud={[true, true, true, true]}
                />
            ) : (
                <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>לא נמצאו פריטים במערכת. ניסיון חוזר...</p>
                    <p>טוען את פרטי ההזמנות</p>
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
};

export default ProductsList;
