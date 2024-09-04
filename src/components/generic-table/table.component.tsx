import React, { SetStateAction, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';

const GenericTable = ({ list, columns, onRowEditComplete, handleDelete, crud }: { list: any, columns: any, onRowEditComplete: any, handleDelete: any, crud: boolean[] }) => {
    const [editingRow, setEditingRow] = useState(null);
    const [data, setData] = useState(list);

    const allowEdit = (rowData: any) => {
        return rowData._id !== "0";
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };

    const numberEditor = (options: ColumnEditorOptions) => {
        return <InputNumber value={options.value} onChange={(e: InputNumberChangeEvent) => options.editorCallback!(e.value)} />;
    };

    const dateEditor = (options: ColumnEditorOptions) => {
        return (
            <Calendar showTime hourFormat="24" value={options.value} onChange={(e) => options.editorCallback!(e.value!.toISOString())} />
        )
    };

    const addEmptyRow = () => {
        const newEmptyRow: Record<string, any> = {};
        columns.forEach((column: any) => {
            newEmptyRow[column.field] = null; // Initialize each field with an empty value
        });
        setData((prevData: any) => [newEmptyRow, ...prevData]); // Add the new empty row at the beginning of the data array
        newEmptyRow._id = "מזהה חדש יווצר אוטומטית לאחר שמירת הפריט"
        allowEdit(newEmptyRow); // Set the new empty row for editing
        // textEditor(options);
    };

    return (
        <>
            {crud[0]&&<Button label=" הוסף פריט" icon="pi pi-plus" onClick={addEmptyRow} className="p-button-rounded p-button-primary" />
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
                onRowEditComplete={(rowData) => {
                    const updatedData = [...data];
                    const index = updatedData.findIndex((item) => item._id === rowData.data._id);
                    updatedData[index] = { ...rowData.data };
                    setData(updatedData);
                    onRowEditComplete(rowData.data);
                }}
            >
                {columns.map((column: any) => (
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
                                            dateEditor(options) : null
                            )
                            : null}
                    />
                ))}{
                    crud[2] &&
                    <Column rowEditor={allowEdit} className="p-button-rounded p-button-info" bodyStyle={{ textAlign: 'center' }} />
                }{crud[3] && <Column
                    headerStyle={{ width: '10%', minWidth: '8rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                    rowEditor={allowEdit}
                    body={(rowData) => (
                        <>
                            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData._id)} />
                        </>)}
                />}
            </DataTable>
        </>
    );
};

export default GenericTable;
