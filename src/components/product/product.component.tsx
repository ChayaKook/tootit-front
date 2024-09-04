import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { ProductModel } from '../../interfaces/product.interface';
import { useNavigate } from 'react-router-dom';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';

const Product = ({ data, sale }: { data: ProductModel, sale:boolean }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const product = {
        _id: data._id,
        name: data.name,
        description: data.description,
        image: data.image,
        price: data.price,
        category: data.category
    };
    const navigate = useNavigate();

    useEffect(() => {
        const loadImage = async () => {
            try {
                const imageModule = await import(`../../assets/${product.image}`);
                setImageSrc(imageModule.default);
            } catch (error) {
                console.error(error);
                const imageModule = await import(`../../assets/minipay.jpg`);
                setImageSrc(imageModule.default);
            }
        };

        loadImage();
    }, [product.image]);

    const buy = () => {
        navigate('/order', { state: { product: product } });
    };

    return (
        <div style={{ backgroundColor: "#f3fbff", borderRadius: "10%" , margin: "10px", padding: "10px", display: "inline-flex", width: "30%", height: "250px" }}>
            <div>
                <div key={product._id} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "inline-block", marginRight: "5px", marginLeft: "10px" }}>
                        {imageSrc && <img style={{ width: "180px", height: "180px", borderRadius: "50%" }} src={imageSrc} alt={product.name} />}
                    </div>

                    <div style={{ marginLeft: "5px" }}>
                        <h2>{product.name}</h2>
                        <div>{product.description}</div>
                        <div>
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold"> {product.category}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <span className="text-2xl font-semibold">{product.price} &#8362;</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={buy}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Product;
