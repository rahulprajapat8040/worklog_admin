interface ProgressBarProps {
  value: number; // current value
  max?: number; // max value (default 100)
  color?: string; // tailwind color class
  height?: string; // height of bar
  showLabel?: boolean; // show percentage text
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = "bg-primary",
  height = "h-3",
  showLabel = false,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span>{value}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}

      <div className={`w-full bg-muted rounded-full overflow-hidden ${height}`}>
        <div
          className={`${color} ${height} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
