const Shimmer = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {Array(20)
        .fill(0)
        .map(() => (
          <div
            key={`id-${Math.random().toString(16).slice(2)}`}
            className="p-2 m-2 shadow-lg"
          >
            <div className="lg:h-48 bg-gray-400 md:h-36 w-full object-cover object-center rounded-lg" />
            <ul className="p-2">
              <li className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></li>
              <li className="bg-gray-400 animate-pulse h-4 w-1/2 mb-2"></li>
              <li className="bg-gray-400 animate-pulse h-4 w-1/3 mb-2"></li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
