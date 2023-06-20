import fs from "fs"
import { NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid'
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";
const bucketName = process.env.S3_BUCKET_NAME

export async function POST(request){
    const formData = await request.formData();
    await mongooseConnect();
    await isAdminRequest();
    const client = new S3Client({
        region: 'ap-southeast-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
        }
    })

    const links = [];
    try{
        
        for (const entry of formData){
            const file = entry[1]
            if(file instanceof Blob){
                const fileType = file.type;
                const extension = file.name.split('.').pop();
                const newFileDirectory = uuidv4() +"."+extension;
                const stream = file.stream();
                const chunks = [];
                for await (const chunk of stream) {
                    chunks.push(chunk);
                }
                const buffer = Buffer.concat(chunks);
                
                await client.send(new PutObjectCommand({
                    Bucket: bucketName,
                    Key: newFileDirectory,
                    Body: buffer,
                    ACL: 'public-read',
                    ContentType: fileType,
                }))

                const link = `https://${bucketName}.s3.amazonaws.com/${newFileDirectory}`
                links.push(link)
            }
        }
    } catch(e) {
        return NextResponse.json("Failed")
    }
    // console.log(links)
    return NextResponse.json({links},{status:200})
}