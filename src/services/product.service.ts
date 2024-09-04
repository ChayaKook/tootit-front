import { ProductModel } from "../interfaces/product.interface";
// const API = process.env.API;
const API = "http://localhost:8080"


const ProductService = {
  getProducts: async (): Promise<ProductModel[] | any> => {
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

  getProduct: async (productId: string): Promise<ProductModel[] | any> => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${API}/products/${productId}`, {
      method: 'GET',
      headers: headers
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch product by Id');
    }
  },

  createProduct: async (product: ProductModel): Promise<ProductModel | any> => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${API}/products`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch product by Id');
    }
  },

  updateProduct: async (product: ProductModel): Promise<ProductModel | any> => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${API}/products/${product._id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch product by Id');
    }
  },
  
  deleteProduct: async (productId: string): Promise<ProductModel | any> => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${API}/products/${productId}`, {
      method: 'DELETE',
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('Failed to fetch product by Id');
    }
  },
};

export default ProductService; 