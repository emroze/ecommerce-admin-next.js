"use client"
import ProductForm from "@/components/ProductForm"
import Spinner from "@/components/spinner";
import axios from "axios"
import { useEffect, useState } from "react"

export default function EditProductPage({params}){
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {id} = params 
    useEffect(() => {
        if(!id){
            return ;
        }
        setIsLoading(true);
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
            setIsLoading(false);
        })
    },[id])
    return (
        <div> 
            <h1>Edit Products</h1>
            {isLoading && (
                <Spinner fullwidth={1}/>
            )}
            {productInfo && 
                (
                    <ProductForm {...productInfo}/>
                )
            }
        </div>
    )
}