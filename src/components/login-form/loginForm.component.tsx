import React, { useState } from 'react';
import "./loginForm.component.css"
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import { Button } from 'primereact/button';
import AuthService from '../../services/auth.service';
import { Navigate, useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        AuthService.login({ email, password }).then((data) => {
            if(data === true) {
                navigate("/admin")
            }
        })
    };

    return (
        <form onSubmit={handleSubmit} className="card flex flex-column md:flex-row gap-3" style={{ maxWidth: '350px' }}>
            <h1>אנא התחבר למערכת</h1>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-at"></i>
                </span>
                <InputText placeholder="אימייל"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-key"></i>
                </span>
                <InputText placeholder="סיסמה"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br /><br />
            <Button type="submit" label="התחברות" />

        </form>
    );
};

export default LoginForm;
