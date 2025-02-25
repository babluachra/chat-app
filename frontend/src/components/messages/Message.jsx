import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClsss = message.shouldShake ? "shake": '';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar ">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="tailwind css chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClsss}`}>
        {message.message}
      </div>
      <div className={`chat-footer items-center gap-1 flex text-xs opacity-50`}>
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
