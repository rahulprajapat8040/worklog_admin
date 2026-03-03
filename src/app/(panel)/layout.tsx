import Layout from "@/components/layout/Layout";

const PanelLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <Layout>{children}</Layout>;
};
export default PanelLayout;
