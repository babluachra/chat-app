const MessageSkleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-40 skeleton"></div>
          <div className="h-4 w-40 skeleton"></div>
        </div>
      </div>
      <div className="flex gap-3 justify-end items-center">
        <div className="flex flex-col gap-1">
            <div className="h-4 w-40 skeleton"></div>
        </div>
        <div className="rounded-full shrink-0 h-4 w-40 skeleton"></div>
      </div>
    </>
  );
};

export default MessageSkleton;
