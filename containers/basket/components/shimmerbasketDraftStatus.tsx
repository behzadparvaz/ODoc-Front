const ShimmerBasketDraftStatus = () => (
  <div className="border rounded-md w-full p-4">
    <div className="flex flex-col justify-center items-center w-full gap-y-4">
      <div className="w-[80px] h-[80px] bg-gray-300 animate-pulse rounded-full" />
      <div className="w-3/4 h-6 bg-gray-300 animate-pulse mb-4 rounded" />
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        <div className="w-3/4 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default ShimmerBasketDraftStatus;
