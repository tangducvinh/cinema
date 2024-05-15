function Wrapper({ children }) {
  return (
    <div className="w-full min-w-48 min-h-20 bg-white rounded-md shadow-2xl">
      {children}
    </div>
  );
}

export default Wrapper;
