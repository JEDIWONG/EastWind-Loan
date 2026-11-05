

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
      <div className="h-25 w-25 animate-spin rounded-full border-5 border-gray-100 border-t-yellow-500 [animation-duration:1.5s]"></div>
      <p className="mt-4 text-sm font-medium text-gray-700">
        Loading...
      </p>
    </div>
  );
};

export default LoadingOverlay;