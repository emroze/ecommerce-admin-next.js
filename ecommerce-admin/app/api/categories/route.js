import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../auth/[...nextauth]/route";


export async function POST(request){
    await mongooseConnect();
    await isAdminRequest();
    const {name, parentCategory,properties} = await request.json();
    
    const categoryDoc = await Category.create({
        name: name, 
        parent: parentCategory || undefined,
        properties,
    });
    return NextResponse.json(categoryDoc)
}

export async function GET(request,response){
    await mongooseConnect();
    await isAdminRequest();
    return NextResponse.json(await Category.find().populate('parent'));
}

export async function PUT(request) {
    await mongooseConnect();
    await isAdminRequest();
    const {name, parentCategory,properties, _id} = await request.json();
    const categoryDoc = await Category.updateOne({_id:_id},{
        name: name, 
        parent: parentCategory || undefined,
        properties,
    });
    return NextResponse.json(categoryDoc)
}

export async function DELETE(request){
    await mongooseConnect();
    await isAdminRequest();
    const _id = request.nextUrl.searchParams?.get('_id')
    console.log(_id)
    await Category.deleteOne({_id: _id});
    return NextResponse.json("ok");
}