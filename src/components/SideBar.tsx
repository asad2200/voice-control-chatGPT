import NewChat from "./NewChat"

function SideBar() {
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
        </div>
    )
}

export default SideBar