function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar ">
        <div className="w-10 rounded-full">
          <img
            src={
              "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-1024.png"
            }
            alt="tailwind css chat bubble component"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi! Whats up?</div>
      <div className={`chat-footer items-center gap-1 flex text-xs opacity-50`}>
        12:42
      </div>
    </div>
  );
}

export default Message;
