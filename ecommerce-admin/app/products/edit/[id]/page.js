"use client"
import ProductForm from "@/components/ProductForm"
import axios from "axios"
import { useEffect, useState } from "react"

export default function EditProductPage({params}){
    const [productInfo, setProductInfo] = useState(null);
    const {id} = params 
    useEffect(() => {
        if(!id){
            return ;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        })
    },[id])
    return (
        <div> 
            <h1>Edit Products</h1>
            {productInfo && 
                (
                    <ProductForm {...productInfo}/>
                )
            }
        </div>
    )
}