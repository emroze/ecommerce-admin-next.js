import { Product } from '@/lib/models/product';
import { mongooseConnect } from '@/lib/mongoose';
import {NextResponse} from 'next/server';

export async function POST(request){
    const data  = await request.json();
    const {title, description, price} = data;

    await mongooseConnect();
    const productDoc = await Product.create({
        title:title,
        description:description,
        price:price,
    })
    console.log(productDoc)
    return NextResponse.json(productDoc);
}
