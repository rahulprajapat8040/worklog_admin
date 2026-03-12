const ToolTip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50">
      <div className="relative bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {children}

        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black"></div>
      </div>
    </div>
  );
};

export default ToolTip;
