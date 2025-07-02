import React from 'react'
import { FaComments } from 'react-icons/fa'

function Chats() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-700">
      <FaComments className="text-5xl text-myPrimary animate-bounce mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Chat is Coming Soon!</h2>
      <p className="text-gray-500 text-center max-w-md">
        We're working on the chat feature. You'll soon be able to communicate directly with users in real-time!
      </p>
    </div>
  )
}

export default Chats
