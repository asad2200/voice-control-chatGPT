'use client'

import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"

function SideBar() {
    const { data: session } = useSession()

    return (
        <div className="p-2 flex flex-col h-screen bg-gray-500/20">
            <div className="flex-1">
                <div>
                    <NewChat />
                    
                    <div>
                        {/* ModelSelection */}
                    </div>

                    {/* Chat Rows */}
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