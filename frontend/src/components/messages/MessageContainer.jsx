import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";


const  MessageContainer=()=> {
  const {authUser} =  useAuthContext();
  const {selectedConversation,setSelectedConversation} = useConversation();

  useEffect(()=>{
    // cleanup function
    return ()=>setSelectedConversation(null);
  },[setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col ">
      {!selectedConversation ? (
        
        <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col gap-2 items-center">
        <p>Welcome 👋 {authUser.fullName} ❄️</p>
        <p>Select a chat for start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
      ) : (
        <>
          {/* header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;


// const noChatSelected = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col gap-2 items-center">
//         <p>Welcome Bablu Acha *</p>
//         <p>Select a chat for start messaging</p>
//         <TiMessages className="text-3xl md:text-6xl text-center" />
//       </div>
//     </div>
//   );
// };