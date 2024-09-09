import React, { SetStateAction, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ProductModel } from '../../interfaces/product.interface';
import ProductService from '../../services/product.service';

const GenericTable = ({ list, columns, addItem, onRowEditComplete, handleDelete, crud }: { list: any, columns: any, addItem: any, onRowEditComplete: any, handleDelete: any, crud: boolean[] }) => {
    const [editingRow, setEditingRow] = useState(null);
    const [data, setData] = useState(list);

    let editNew = false

    const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => {
        ProductService.getProducts().then((data: React.SetStateAction<ProductModel[]>) => setProducts(data));
    }, []);

    const allowEdit = (rowData: any) => {
        return rowData._id !== "0";
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { options.editorCallback!(e.target.value) }} />;
    };

    const numberEditor = (options: ColumnEditorOptions) => {
        return <InputNumber value={options.value} onChange={(e: InputNumberChangeEvent) => options.editorCallback!(e.value)} />;
    };

    const dateEditor = (options: ColumnEditorOptions) => {
        return (
            
            <Calendar showTime hourFormat="24" value={options.value} onChange={(e) => options.editorCallback!(e.value!.toISOString())} />
        )
    };

    const productEditor = (options: ColumnEditorOptions) => {
        return (
            <Dropdown value={options.value} options={products} onChange={(e) => {options.editorCallback!(e.value.name);options.rowData.product._id=e.value._id;
            }} className="w-full md:w-14rem" optionLabel="name" placeholder="בחר מוצר"/>
        );
    };


    const addEmptyRow = () => {
        if (editNew == false && data[0]._id != "מזהה חדש יווצר אוטומטית לאחר שמירת הפריט") {
            const newEmptyRow: Record<string, any> = {};
            columns.forEach((column: any) => {
                newEmptyRow[column.field] = null; // Initialize each field with an empty value
            });
            setData((prevData: any) => [newEmptyRow, ...prevData]); // Add the new empty row at the beginning of the data array
            newEmptyRow._id = "מזהה חדש יווצר אוטומטית לאחר שמירת הפריט"
            allowEdit(newEmptyRow); // Set the new empty row for editing
            // textEditor(options);
            editNew = true
        }
    };

    const deleteItem = (_id: string) => {
        // Remove item from data
        const updatedData = data.filter((item: any) => item._id !== _id);
        setData(updatedData);

        // Call handleDelete with the _id of the item to be deleted
        handleDelete(_id);
    }


    const cencelNewItem = () => {
        const newData = data.filter((item: { _id: string; }) => item._id != "מזהה חדש יווצר אוטומטית לאחר שמירת הפריט")
        setData(newData);
        editNew = false
    }

    return (
        <>
            {crud[0] && <Button label=" הוסף פריט" icon="pi pi-plus" onClick={addEmptyRow} className="p-button-rounded p-button-primary" />
            }<DataTable
                id="dynamicTable"
                stripedRows
                paginator
                rows={5}
                rowsPerPageOptions={[5, 8, 12, 16]}
                value={data}
                style={{ textAlign: "right", direction: "rtl" }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                editMode="row"
                dataKey="_id"
                onRowEditComplete={(event) => {
                    const updatedData = [...data]; // Create a copy of the current data array
                    const index = updatedData.findIndex((item) => item._id === event.newData._id); // Find the index of the edited row
                    updatedData[index] = { ...event.newData }; // Update the data at the found index with the edited row data
                    setData(updatedData); // Update the state with the new data
                    // Retrieve the updated data from the state instead of event.data
                    const updatedRowData = updatedData[index];
                    if (event.data._id === "מזהה חדש יווצר אוטומטית לאחר שמירת הפריט") {
                        delete updatedData[index]._id;
                        const newItem = addItem(updatedData[index]); // Add the new item if it's a new entry
                        editNew = false;
                        updatedData[index]._id = newItem._id
                        if (newItem)
                            setData(updatedData);
                        else
                            setData(updatedData.slice(index, 1));
                    } else
                        // Call the onRowEditComplete function with the updated data
                        onRowEditComplete(updatedData[index]);
                }}


            >
                {/* {columns.map((column: any) => (
                    <Column
                        key={column.field}
                        field={column.field}
                        header={column.header}
                        style={{ textAlign: "right" }}
                        sortable={column.sort}
                        editor={(column.field !== "_id" && column.field !== "note") ?
                            (options) => (
                                column.type === 'text' ?
                                    textEditor(options) :
                                    column.type === 'number' ?
                                        numberEditor(options) :
                                        column.type === 'date' ?
                                            dateEditor(options) :
                                            column.field === 'product' ?
                                                productEditor(options) : null
                            )
                            : null}
                    />
                ))} */}
                {columns.map((column: any) => (
                    Array.isArray(column.fieldsList) ? (
                        column.fieldsList.map((subColumn: any) => ((subColumn.toShow) &&
                            (<Column
                                key={subColumn.field}
                                field={subColumn.field}
                                header={subColumn.header}
                                style={{ textAlign: "right" }}
                                sortable={subColumn.sort}
                                editor={(subColumn.field !== "_id" && subColumn.field !== "note") ?
                                    (options) => (
                                        subColumn.type === 'text' ?
                                            textEditor(options) :
                                            subColumn.type === 'number' ?
                                                numberEditor(options) :
                                                subColumn.type === 'date' ?
                                                    dateEditor(options) :
                                                    subColumn.type === 'product' ?
                                                        productEditor(options) : null
                                    )
                                    : null}
                            />) 
                        )

                        )
                    ) : (
                        <Column
                            key={column.field}
                            field={column.field}
                            header={column.header}
                            style={{ textAlign: "right" }}
                            sortable={column.sort}
                            editor={(column.field !== "_id" && column.field !== "note") ?
                                (options) => (
                                    column.type === 'text' ?
                                        textEditor(options) :
                                        column.type === 'number' ?
                                            numberEditor(options) :
                                            column.type === 'date' ?
                                                dateEditor(options) :
                                                column.type === 'product' ?
                                                    productEditor(options) : null
                                )
                                : null}
                        />
                    )
                ))}

                {
                    crud[2] &&
                    <Column rowEditor={allowEdit} className="p-button-rounded p-button-info" bodyStyle={{ textAlign: 'center' }} />
                }{crud[3] && <Column
                    headerStyle={{ width: '10%', minWidth: '8rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                    rowEditor={allowEdit}
                    body={(rowData) => (
                        <>
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                                onClick={() => {
                                    rowData._id == "מזהה חדש יווצר אוטומטית לאחר שמירת הפריט" ? cencelNewItem() : deleteItem(rowData._id);
                                }} />
                        </>)}
                />}
            </DataTable>
        </>
    );
};

export default GenericTable;
