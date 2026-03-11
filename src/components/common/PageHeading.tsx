interface Props {
  heading: string;
  description?: string;
  className?: string;
}
const PageHeading: React.FC<Props> = ({ heading, description, className }) => {
  return (
    <div>
      <h1 className={`text-2xl font-bold text-foreground ${className}`}>
        {heading}
      </h1>
      {description && (
        <h2 className="text-sm text-muted-foreground">{description}</h2>
      )}
    </div>
  );
};
export default PageHeading;
