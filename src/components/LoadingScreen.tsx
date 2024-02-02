const LoadingScreen = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] grid min-h-screen w-full place-content-center gap-4 bg-neutral-900 bg-opacity-40">
      <div className="loading-circle" />
      <p className="text-lg text-neutral-100">Please wait...</p>
    </div>
  );
};

export default LoadingScreen;
