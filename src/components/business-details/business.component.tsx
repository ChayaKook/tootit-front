import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { BusinessModel } from '../../interfaces/business.interface';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import BusinessService from '../../services/business.service';

const BusinessDetails: React.FC = () => {
    const [businessDetails, setBusinessDetails] = useState<BusinessModel | null>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await BusinessService.getBusiness();
            if (data) {
                setBusinessDetails(data);
            } else {
                // Handle error or empty data
            }
        };

        fetchData();
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        // Implement save logic here
        setEditing(false);
        const data = await BusinessService.updateBusiness(businessDetails!);
        if (data) {
            showSuccess();
        } else {
            showError();
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setBusinessDetails((prevDetails) => ({
            ...prevDetails!,
            [field]: value,
        }));
    };

    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'נהדר!', detail: 'פרטי העסק נשמרו בהצלחה!', life: 3000 });
    };

    const showError = () => {
        toast.current?.show({ severity: 'error', summary: 'שגיאה!', detail: 'ארעה שגיאה בשמירת הנתונים, אנא נסו שנית', life: 3000 });
    };

    return (
        <div>
            <Toast ref={toast} />

            {businessDetails ? (
                <div>
                    <div>
                        <label>שם העסק:</label>
                        {editing ? (
                            <InputText value={businessDetails.name!} onChange={(e) => handleInputChange('name', e.target.value)} />
                        ) : (
                            <span>{businessDetails.name}</span>
                        )}
                    </div>
                    <br />
                    <div>
                        <label>טלפון:</label>
                        {editing ? (
                            <InputText value={businessDetails.phone!} onChange={(e) => handleInputChange('phone', e.target.value)} />
                        ) : (
                            <span>{businessDetails.phone!}</span>
                        )}
                    </div>
                    <br />
                    <div>
                        <label>כתובת:</label>
                        {editing ? (
                            <InputText value={businessDetails.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                        ) : (
                            <span>{businessDetails.address}</span>
                        )}
                    </div>
                    <br />
                    <div>
                        <label>מנהל:</label>
                        {editing ? (
                            <InputText value={businessDetails.admin.name} onChange={(e) => handleInputChange('admin', e.target.value)} />
                        ) : (
                            <span>{businessDetails.admin.name}</span>
                        )}
                    </div>
                    <br />
                    {editing ? (
                        <Button label="שמירה" onClick={handleSave} />
                    ) : (
                        <Button label="עריכה" onClick={handleEdit} />
                    )}
                </div>
            ) : (
                <div className="card flex justify-content-center" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p>טוען את פרטי העסק</p>
                    <ProgressSpinner />
                </div>
            )}
        </div>
    );
};

export default BusinessDetails;
