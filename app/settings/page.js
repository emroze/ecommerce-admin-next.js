'use client'
import Spinner from "@/components/spinner";
import axios from "axios"
import { useEffect, useState } from "react"
import { withSwal } from "react-sweetalert2";

function SettingsPage({swal}){
    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [featuredProductId, setFeaturedProductId] = useState('null');
    const [shippingFee, setShippingFee] = useState('')


    useEffect(() => {
        setIsLoading(true);
        fetchAll().then(() => {
            setIsLoading(false);
        });
    },[])

    async function fetchAll(){
        await axios.get('/api/products').then(res => {
            setProducts(res?.data);
        })

        await axios.get('/api/settings?name=featuredProductId').then(res => {
            setFeaturedProductId(res?.data.value);
        })

        await axios.get('/api/settings?name=shippingFee').then(res => {
            setShippingFee(res?.data.value);
        })
    }

    async function saveSettings(){
        setIsLoading(true);
        await axios.put('/api/settings',{
            name: 'featuredProductId',
            value: featuredProductId,
        })
        await axios.put('/api/settings',{
            name: 'shippingFee',
            value: shippingFee,
        })
        await swal.fire({
            title: 'Settings Updated',
            icon: 'success',
        })
        setIsLoading(false);
    }
    return(
        <>
            <h1>Store Settings</h1>
            {(isLoading) && (
                <Spinner fullwidth={1}/>
            )}
            {(!isLoading) && (
                <>
                    <label>Featured Product</label>
                    <select value={featuredProductId} onChange={ev => setFeaturedProductId(ev.target.value)}>
                        {products.length>0 && products.map(product => (
                            <option key={product._id} value={product._id}>{product.title}</option>
                        ))}
                    </select>

                    <label>Shipping Fee(in Usd)</label>
                    <input type='number'
                            value={shippingFee}
                            onChange={ev => setShippingFee(ev.target.value)}/>
                    <div>
                        <button onClick={saveSettings} className="btn-primary">Save Settings</button>
                    </div>
                </>
            )}
            
        </>
    )
}


export default withSwal(({swal}) => (
    <SettingsPage swal={swal}/>
))