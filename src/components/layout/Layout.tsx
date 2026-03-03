import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-20 lg:pb-0 p-4">{children}</main>
    </div>
  );
};

export default Layout;
