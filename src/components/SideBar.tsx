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
        fallbackData: 'text-davici-003'
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
                <img 
                    onClick={() => {signOut()}}
                    src={session.user?.image!}
                    className="h-12 w-12 p-2 rounded-full mx-auto mb-2 
                    cursor-pointer hover:opacity-50"
                />
            )}
        </div>
    )
}

export default SideBar