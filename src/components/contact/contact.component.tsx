import React from 'react';
import { Button } from 'primereact/button';
import CustomToolbar from '../tool-bar/toolBar.component';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

const ContactComponent = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "40%", direction: "rtl", }}>
                <h1 style={{ textAlign: "center"}}>יצירת קשר</h1>
                <h2>פריט הלקוח</h2>
                <Divider></Divider>
                <div className="p-inputgroup flex-1" style={{marginBottom:"5%", textAlign: "center"}}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="שם" />
                </div>
                <div className="p-inputgroup flex-1" style={{marginBottom:"5%", textAlign: "center"}}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-at"></i>
                    </span>
                    <InputText placeholder="אימייל לחזרה" />
                </div>
                <h2>פריט הפניה</h2>
                <Divider></Divider>
                <div className="p-inputgroup flex-1" style={{marginBottom:"5%", textAlign: "center"}}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-tag"></i>
                    </span>
                    <InputText placeholder="נושא הפניה" />
                </div>
                <div className="p-inputgroup flex-1" style={{marginBottom:"5%", textAlign: "center"}}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-comment"></i>
                    </span>
                    <InputTextarea placeholder='נא תארו בקצרה את גוף הפניה, ונשתדל לחזור אליכם בהקדם'></InputTextarea>

                </div>
            </div>
            <Button label="שלח" />

        </div>
    );
}

export default ContactComponent;
