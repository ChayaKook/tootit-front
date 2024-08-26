import { ProductModel } from "../interfaces/product.interface";
// const API = process.env.API;
const API = "http://localhost:8080"


const ProductService = {
    getProducts: async (): Promise<ProductModel[]|any> => {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
      
        const response = await fetch(`${API}/products`, {
          method: 'GET',
          headers: headers
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('Failed to fetch products');
        }
    },
};

export default ProductService;
