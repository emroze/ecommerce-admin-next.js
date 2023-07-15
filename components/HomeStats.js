import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "./spinner";
import { subHours } from "date-fns";



export default function HomeStats(){
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function ordersTotal(orders){
        let sum = 0;
        orders.forEach(order => {
            const {line_items} = order;
            line_items.forEach(li => {
                const lineSum = li.quantity * li.price_data.unit_amount / 100;
                sum += lineSum
            })

        });
        return new Intl.NumberFormat('en-GB').format(sum)
    }

    useEffect(()=>{
        setIsLoading(true);
        axios.get('/api/orders').then(res => {
            setOrders(res.data);
            setIsLoading(false);
        })
    },[])

    if(isLoading){
        return(
            <div className="my-4">
                <Spinner fullwidth={1}/>
            </div>
        )
    }

    const ordersToday = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24));
    const ordersWeeks = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24*7));
    const ordersMonths = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24*30));

    return (
       <div>
            <h2>Orders</h2>
            <div className="tiles-grid">
                <div className="tile">
                    <h3 className="tile-header">Today</h3>
                    <div className="tile-number">{ordersToday.length}</div>
                    <div className="tile-desc">orders today</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Week</h3>
                    <div className="tile-number">{ordersWeeks.length}</div>
                    <div className="tile-desc">orders this week</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Months</h3>
                    <div className="tile-number">{ordersMonths.length}</div>
                    <div className="tile-desc">orders this month</div>
                </div>
            </div>
            
            <h2>Revenue</h2>
            <div className="tiles-grid">
                <div className="tile">
                    <h3 className="tile-header">Today</h3>
                    <div className="tile-number">${ordersTotal(ordersToday)}</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Week</h3>
                    <div className="tile-number">${ordersTotal(ordersWeeks)}</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Months</h3>
                    <div className="tile-number">${ordersTotal(ordersMonths)}</div>
                </div>
            </div>
       </div> 
    )
}