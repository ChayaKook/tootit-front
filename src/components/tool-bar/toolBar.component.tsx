import React from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { Avatar } from 'primereact/avatar';

import tootit from '../../assets/tootit.svg';
import { Link } from 'react-router-dom';

const CustomToolbar = () => {
    const startContent = (
        <React.Fragment>
            <div>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}><p>בית</p>
                </Link>
            </div>
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-3 justify-content-space-between">
            <Link to="/admin" style={{ textDecoration: 'none' }}>
                <button style={{ margin: "10px" }} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                    <i className="pi pi-user text-4xxl"></i>
                </button>
            </Link>
            <Link to="/products" style={{ textDecoration: 'none' }}>
                <button style={{ margin: "10px" }} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                    <i className="pi pi-shopping-cart text-2xl"></i>
                </button>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button style={{ margin: "10px" }} className="p-link inline-flex justify-content-center align-items-center text-white h-5rem w-5rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                    <i className="pi pi-envelope text-2xl"></i>
                </button>
            </Link>
        </div>
    );

    const endContent = (
        <React.Fragment>
            <img src={tootit} className="App-logo" alt="logo" style={{ width: "30px", height: "30px" }} />
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar aria-label="Actions" start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2"
                style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
        </div>
    );

}

export default CustomToolbar;
