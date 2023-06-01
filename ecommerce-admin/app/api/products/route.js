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
    // console.log(productDoc)
    return NextResponse.json(productDoc);
}

export async function GET(request){
    await mongooseConnect();
    const id = request.nextUrl.searchParams?.get('id');
    if(id){
        return NextResponse.json(await Product.findOne({_id:id}))
    } else{
        return NextResponse.json(await Product.find());
    }
    
}

export async function PUT(request) {
    await mongooseConnect();
    const {_id,title,description,price} = await request.json();
    await Product.updateOne({_id},{title,description,price});
    return NextResponse.json(true);
}

export async function DELETE(request) {
    await mongooseConnect();
    const id = request.nextUrl.searchParams?.get('id');
    await Product.deleteOne({_id:id});
    return NextResponse.json(true);
}