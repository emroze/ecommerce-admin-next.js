import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";
import { Admin } from "@/models/admin";
import { NextResponse } from "next/server";

export async function POST(request){
    await mongooseConnect();
    await isAdminRequest();
    const {email} = await request.json();
    if(await Admin.findOne({email})){
        return NextResponse.json({
            message: "Admin already exist!",
        },{
            status: 400,
        });
    }
    return NextResponse.json(await Admin.create({email}));
}


export async function GET(){
    await mongooseConnect();
    await isAdminRequest();
    return NextResponse.json(await Admin.find());
}

export async function DELETE(request){
    const allSearchParams = {}
    for (const [key, value] of request.nextUrl.searchParams.entries()) {       
        allSearchParams[key] = value
    }
    const id = allSearchParams['_id']
    const deleted = await Admin.findOneAndDelete({_id:id});
    return NextResponse.json(true);
}