import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";
import { Setting } from "@/models/setting";
import { NextResponse } from "next/server";



export async function PUT(request){
    await mongooseConnect();
    await isAdminRequest();
    const data = await request.json();
    const {name, value} = data;
    const settingsDoc = await Setting.findOne({name});
    if(settingsDoc) {
        settingsDoc.value = value;
        await settingsDoc.save();
        return NextResponse.json(settingsDoc)
    }else{
        return NextResponse.json(await Setting.create({name, value}));
    }
}

export async function GET(request){
    await mongooseConnect();
    await isAdminRequest();
    const allSearchParams = {};
    for (const [key,value] of request.nextUrl.searchParams.entries()){
        allSearchParams[key] = value
    }
    const {name} = allSearchParams;
    return NextResponse.json(await Setting.findOne({name}));
}