
import { useState, useEffect } from 'react';
import { BusinessModel } from '../../interfaces/business.interface';
import BusinessService from '../../services/business.service';
import './home.component.css';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import tootit from '../../assets/tootit.svg';


const Home = () => {
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

    return (
        <div style={{ backgroundColor: "#fff6fb", marginTop: "5%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <img src={tootit} className="App-logo" alt="logo" style={{ width: "300px", height: "300px" }} />
            <Panel header={businessDetails?.name}
                style={{ width: "30%", textAlign: "center", borderRadius: "13%" }}>
                <p>קינוחי פירות אקסלוסיביים מהשורה הראשונה</p>
                <p>  יצירות מופת של שפים מהשורה הראשונה</p>
                <p>  לאירועי יוקרה, ולכל מי שתרצו לכבד</p>
                <Divider></Divider>
                <p>כתובתנו: {businessDetails?.address}</p>
                <p>שירות לקוחות: {businessDetails?.phone}</p>
                <p>מנהל העסק: {businessDetails?.admin.name}</p>

            </Panel>
        </div >
    );
}

export default Home;
