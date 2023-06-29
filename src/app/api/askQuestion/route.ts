import query from '@/lib/queryApi'
import { NextResponse } from 'next/server'
import admin from 'firebase-admin'
import { adminDb } from '../../../../firebaseAdmin'

export async function POST(request: Request) {
    
    const { prompt, chatId, model, session } = await request.json()
    
    if(!prompt){
        return NextResponse.json({answer: "Please Provide a Prompt!"}, {status: 400})
    }

    if(!chatId){
        return NextResponse.json({answer: "Please Provide valid Chat ID!"}, {status: 400})
    }

    // ChatGPT Query
    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response || `ChatGPT was unable to find the answer!`,
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "/ChatGPT-LOGO.png"
        }
    }

    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection("messages")
    .add(message)
    
    return NextResponse.json({ answer: message.text }, {status: 200})
}