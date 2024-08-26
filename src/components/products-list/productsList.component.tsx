

import React, { useState, useEffect } from 'react';
import ProductService from '../../services/product.service';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import Product from '../product/product.component';
import { ProductModel } from '../../interfaces/product.interface'


export default function BasicDemo() {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const listTemplate = (items: ProductModel[]) => {
        if (!items || items.length === 0) return [];

        return items.map((product, index) => {
            return <Product data={product} />;
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems:"center"}}>
            <h1>המוצרים שלנו</h1>

            <div className="card" style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
                <DataView value={products} listTemplate={listTemplate} />
            </div>
        </div>
    )
}
