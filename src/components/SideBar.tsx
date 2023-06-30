'use client'

import { useSession, signOut } from "next-auth/react"
import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore'

import NewChat from "./NewChat"
import { db } from "../../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection"
import useSWR from "swr"

function SideBar() {
    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session && query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
    ));

    const { data: model } = useSWR("model", {
        fallbackData: 'text-davinci-003'
    })

    return (
        <div className="p-2 flex flex-col h-screen bg-gray-500/20">
            <div className="flex-1">
                <div>
                    <NewChat />
                    
                    <div className="hidden md:inline">
                        <ModelSelection />
                    </div>

                    <div className="flex flex-col space-y-2 my-2">

                        {loading && (
                            <div className="animate-pulse text-center text-white">
                                <p>Loading Chats...</p>
                            </div>
                        )}

                        {chats?.docs.map((chat) => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))}
                    </div>
                    
                </div>
            </div>

            {session && (
                <div className="flex flex-wrap items-center justify-center mb-2">
                    <img
                        src={session?.user?.image!}
                        className="h-12 w-12 p-2 rounded-full"
                    />
                    <div className="max-w-full text-gray-400 px-2 flex-1">
                        <p className="break-words">{session?.user?.name!}</p>
                        <p className="break-words">{session?.user?.email!}</p>
                        <p onClick={() => {signOut()}} className="break-words underline underline-offset-1 
                            cursor-pointer hover:opacity-50">
                            Sign Out
                        </p>
                    </div>
                </div>
                
            )}
        </div>
    )
}

export default SideBar