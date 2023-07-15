"use client"
import Spinner from "@/components/spinner";
import axios from "axios"
import { useEffect, useState } from "react"

export default function OrdersPage(){
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        axios.get('api/orders').then(response => {
            setOrders(response.data);
            setIsLoading(false);
        })
    },[])
    return (
        <div>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr >
                        <td colSpan={4}>
                            <div className="py-4">
                                <Spinner fullwidth={1}/>
                            </div>
                        </td>                           
                        </tr>
                    )}
                    {orders.length>0 && orders.map(order => (
                        <tr>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td className={order.paid? 'text-green-600':'text-red-600'}>
                                {order.paid? 'YES' : 'NO'}
                            </td>
                            <td>
                                {order.name} {order.email}<br/>
                                {order.city} {order.postalCode} {order.country}<br/>
                                {order.streetAddress}
                            </td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data?.name} x {l.quantity}<br/>
                                        
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}