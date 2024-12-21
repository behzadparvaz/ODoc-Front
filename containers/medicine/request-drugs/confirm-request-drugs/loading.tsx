const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-full w-full flex flex-col overflow-auto p-4">
        <div className="w-full min-h-[20px] bg-surface-secondary rounded-md animate-pulse mb-4" />
        <div className="flex items-center mb-4">
          <div className="min-w-[50px] h-[50px] bg-surface-secondary rounded-full animate-pulse mx-4" />
          <div className="flex flex-col justify-between w-full">
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
          </div>
          <div className="min-w-[50px] h-[50px] bg-surface-secondary rounded-full animate-pulse mx-4" />
        </div>
        <div className="flex items-center mb-4">
          <div className="min-w-[50px] h-[50px] bg-surface-secondary rounded-full animate-pulse mx-4" />
          <div className="flex flex-col justify-between w-full">
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
            <div className="w-full h-[10px] bg-surface-secondary rounded-md animate-pulse mb-2" />
          </div>
          <div className="min-w-[50px] h-[50px] bg-surface-secondary rounded-full animate-pulse mx-4" />
        </div>
        <div className="min-h-[1px] bg-grey-200 w-full mb-2" />
        <div className="flex flex-col gap-5 mt-2">
          <div className="w-full h-[140px] bg-surface-secondary rounded-md animate-pulse mb-2" />
          <div className="w-full h-[40px] bg-surface-secondary rounded-md animate-pulse mb-2" />
          <div className="w-full h-[40px] bg-surface-secondary rounded-md animate-pulse mb-2" />
          <div className="w-full h-[40px] bg-surface-secondary rounded-md animate-pulse mb-2" />
        </div>
      </div>
      <div className="h-[1px] bg-grey-200 w-full mb-2" />
      <div className="flex justify-center px-2 mb-2">
        <div className="w-full h-[60px] bg-surface-secondary rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
