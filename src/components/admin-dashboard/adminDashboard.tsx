import React, { useState } from 'react';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import OrdersList from '../orders-list/ordersList.component';
import BusinessDetails from '../business-details/business.component';
import AuthService from '../../services/auth.service';
import CustomerList from '../customers-list/customerList.component';
import { Navigate, useNavigate } from 'react-router-dom';
import ProductsList from '../products-list/productList.component';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // Default active tab

  const navigate = useNavigate();

  const checkAuth = async () => {
    if (await AuthService.validateToken() == false)
      navigate("/login")
  }

  checkAuth()

  const handleTabChange = (event: TabMenuTabChangeEvent) => {
    setActiveTab(event.value.label!);
  };

  const items: MenuItem[] = [
    { label: 'הזמנות', icon: 'pi pi-sale' },
    { label: 'פרטי העסק', icon: 'pi pi-chart-computer' },
    { label: 'לקוחות', icon: 'pi pi-user' },
    { label: 'מוצרים', icon: 'pi pi-sale' }
  ];

  const activeIndex = items.findIndex(item => item.label === activeTab);

  return (
    <div>
      {/* <h1>ברוך שובך, מנהל</h1> */}
      <div className="card">
        <TabMenu model={items} activeIndex={activeIndex} onTabChange={handleTabChange} />
      </div>
      {activeTab === 'הזמנות' && <OrdersList />}
      {activeTab === 'פרטי העסק' && <BusinessDetails />}
      {activeTab === 'לקוחות' && <CustomerList />}
      {activeTab === 'מוצרים' && <ProductsList />}


    </div>
  );
};

export default AdminDashboard;
