interface Props {
  heading: string;
  className?: string;
}
const PageHeading: React.FC<Props> = ({ heading, className }) => {
  return <h1 className={`text-2xl font-bold ${className}`}>{heading}</h1>;
};
export default PageHeading;
