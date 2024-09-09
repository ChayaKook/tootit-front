import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import CustomToolbar from '../tool-bar/toolBar.component';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import SendEmailService from '../../services/sendEmail.service';
import { MessageModel } from '../../interfaces/message.interface';
import { Toast } from 'primereact/toast';

const ContactComponent = () => {

    const [message, setMessage] = React.useState<MessageModel>()

    const handleInputChange = (field: string, value: string) => {
        setMessage((prevDetails) => ({
            ...prevDetails!,
            [field]: value,
        }));
    };

    const sendEmail = async () => {
        if (!message || message?.email === "" || message?.name === "" || message?.subject === "" || message?.body === "") {
            alert(" עליך למלא את כל השדות")
        }
        else
            if (await SendEmailService.sendEmail(message!) != null)
                showSuccess()
            else
                showError()
    }

    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'נהדר!', detail: "הפנייה נשלחה בהצלחה, ונעשה את מירב ההשתדלות לטפל בה בהקדם., life: 3000 " });
    };

    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'שגיאה!', detail: " ארעה שגיאה בשליחת הפנייה, אנא נסו שנית", life: 3000 });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Toast ref={toast} />
            <div style={{ width: "50%", direction: "rtl", backgroundColor: "#fff6fb", borderRadius: "10%",display: "flex", flexDirection: "column", alignItems: "center", marginTop:"4%"  }}>
                <div style={{ width: "45%" }}>
                    <h1 style={{ textAlign: "center" }}>יצירת קשר</h1>
                    <h2>פרטי הלקוח</h2>
                    <Divider></Divider>
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "5%", textAlign: "center" }}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="שם" value={message?.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "5%", textAlign: "center" }}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-at"></i>
                        </span>
                        <InputText placeholder="אימייל לחזרה" value={message?.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    </div>
                    <h2>פרטי הפנייה</h2>
                    <Divider></Divider>
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "5%", textAlign: "center" }}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-tag"></i>
                        </span>
                        <InputText placeholder="נושא הפניה" value={message?.subject} onChange={(e) => handleInputChange('subject', e.target.value)} />
                    </div>
                    <div className="p-inputgroup flex-1" style={{ marginBottom: "5%", textAlign: "center" }}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-comment"></i>
                        </span>
                        <InputTextarea placeholder='נא תארו בקצרה את גוף הפניה, ונשתדל לחזור אליכם בהקדם' value={message?.body} onChange={(e) => handleInputChange('body', e.target.value)}></InputTextarea>

                    </div>
                </div>
                <Button label="שלח" onClick={e => sendEmail()} />
            </div>
        </div>
    );
}

export default ContactComponent;
