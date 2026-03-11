interface Props {
  text: string;
  color?: string;
  className?: string;
}
const StatusText: React.FC<Props> = ({ text, color, className }) => {
  return (
    <span
      style={{
        color: color,
        backgroundColor: `${color}1A`, // ~10% opacity
      }}
      className={`px-2 rounded-full py-1 text-xs capitalize ${className}`}
    >
      {text}
    </span>
  );
};

export default StatusText;
