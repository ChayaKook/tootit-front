import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import ProductService from '../../services/product.service';
import Layer_1 from "../../assets/tootit.svg"
import { ProductModel } from '../../interfaces/product.interface';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Product = ({  data }: {  data: ProductModel }) => {
    // const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {
    //     ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    // }, []);

    // const getSeverity = (product: Product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const product = {
        _id: data._id,
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        category: data.category
    }
    const navigate = useNavigate();


    const buy = () => {
        navigate('/order', { state: {product:product} });
    }
    


    return (
        <div style={{ backgroundColor: "#f3f0e7", margin: "10px", padding: "10px", display: "inline-flex" }}>
            <div key={product._id}>
                <div>
                    <img style={{ width: "200px", height: "200px" }} src={`${product.image}`} alt={product.name} />
                    <div>
                        <div>
                            <h2>{product.name}</h2>
                            <div>{product.description}</div>
                            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                <span>
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{product.price} &#8362;</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={buy}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;
