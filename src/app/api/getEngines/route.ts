import { NextResponse } from 'next/server'
import openai from '@/lib/chatGpt'

type Option = {
    value: string
    label: string
}

type Data = {
    modelOptions: Option[] 
} 

export async function GET(request: Request) {
    
    const models = await openai.listModels().then((res) => res.data.data)
    
    const modelOptions = models.map((model) => ({
        value: model.id,
        label: model.id,
    }))

    return NextResponse.json({ modelOptions }, {status: 200})
}