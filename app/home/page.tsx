const HomePage = () => {
  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="flex flex-col lg:flex-row">
        <div className="mb-4 w-full bg-white p-4 shadow-md lg:mb-0 lg:w-1/6">
          <h2 className="text-lg font-semibold">Left Sidebar</h2>
          <p>Content goes here...</p>
        </div>

        <div className="mb-4 w-full bg-white p-4 shadow-md lg:mx-4 lg:mb-0 lg:w-4/6">
          <h2 className="text-lg font-semibold">Main Content</h2>
          <p>Content goes here...</p>
        </div>

        <div className="w-full bg-white p-4 shadow-md lg:w-1/6">
          <h2 className="text-lg font-semibold">Right Sidebar</h2>
          <p>Content goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
