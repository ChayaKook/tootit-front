import { BusinessModel } from "../interfaces/business.interface";

// const API = process.env.API;
const API = "http://localhost:8080"

const BusinessService = {

    getBusiness: async (): Promise<BusinessModel | any> => {
        try {
            const response = await fetch(`${API}/business`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }

            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }

    },
    updateBusiness: async (business: BusinessModel): Promise<BusinessModel | any> => {
        try {
            const response = await fetch(`${API}/business/${business._id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(business),
            }

            );
            const data = await response.json();
            if (response.status === 200)
                return data;
        } catch (error) {
            console.log(error);
            return null;
        }

    },
}

export default BusinessService;
