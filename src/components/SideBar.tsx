'use client'

import { useSession, signOut } from "next-auth/react"
import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore'

import NewChat from "./NewChat"
import { db } from "../../firebase";
import ChatRow from "./ChatRow";

function SideBar() {
    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session && query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
    ));

    return (
        <div className="p-2 flex flex-col h-screen bg-gray-500/20">
            <div className="flex-1">
                <div>
                    <NewChat />
                    
                    <div>
                        {/* ModelSelection */}
                    </div>

                    {chats?.docs.map((chat) => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ) )}
                </div>
            </div>

            {session && (
                <img 
                    onClick={() => {signOut()}}
                    src={session.user?.image!}
                    className="h-16 w-16 p-2 border border-gray-100/50 rounded-full mx-auto mb-2 
                    cursor-pointer hover:opacity-50"
                />
            )}
        </div>
    )
}

export default SideBar