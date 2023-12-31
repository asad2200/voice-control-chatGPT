'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { db } from "../../firebase"
import { toast } from "react-hot-toast"
import ModelSelection from "./ModelSelection"
import useSWR from "swr"
import { Message } from '../../typings'
import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/solid"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

type Props = {
    chatId: string
}

function ChatInput({ chatId } : Props) {
    
    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()

    const { data: model } = useSWR("model", {
        fallbackData: 'text-davinci-003'
    })

    const sendMessage = async (e: FormEvent <HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return

        const input = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        // Toast Notification Say Loading
        const notification = toast.loading('ChatGPT is thinking...')

        await fetch('/api/askQuestion',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            // Toast Notification Say Success
            toast.success('ChatGPT has responded!',{
                id: notification,
            })
        })
    }

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    const startListening = () => {
        resetTranscript()
        toast('Listening is enabled(Start Speaking)...')
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" })
    }

    const stopListening = () => {
        toast.success('Listening is Completed!')
        setPrompt(transcript)
        SpeechRecognition.stopListening()
    }

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <div className="flex-1">
                    <input 
                        className="bg-transparent focus: outline-none w-full
                            disabled:cursor-not-allowed disabled:text-gray-300
                        "
                        disabled={!session}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        type='text' 
                        placeholder="Type your message here..."
                    />
                    { listening && (
                        <p>{transcript}</p>
                    )}
                </div>
                <div className="flex space-x-2 items-center justify-end">
                    <button 
                        type="submit"
                        disabled={!prompt || !session}
                        className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded 
                            disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black
                        "
                    >
                        <PaperAirplaneIcon className="h-4 w-4 -rotate-45 "/>
                    </button>
                    <button
                        onClick={startListening}
                        disabled={!session || listening}
                        className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded 
                            disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black
                        "
                    >
                        <MicrophoneIcon className="h-4 w-4"/>
                    </button>
                    <button
                        onClick={stopListening}
                        disabled={!session || !listening}
                        className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded 
                            disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black
                        "
                    >
                        <StopIcon className="h-4 w-4"/>
                    </button>
                </div>
            </form>

            <div className="md:hidden">
                <ModelSelection />
            </div>
        </div>
    )
}

export default ChatInput