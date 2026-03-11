import { LucideIcon } from "lucide-react";
import Card from "./Card";

interface Props {
  Icon: LucideIcon;
  title: string | number;
  subTitle: string;
  colorClass?: string;
  growth?: string;
  direction?: string;
}
const AnalyticCard: React.FC<Props> = ({
  Icon,
  title,
  subTitle,
  colorClass,
}) => {
  return (
    <Card>
      <div className="flex items-center gap-4 py-3">
        <div
          className={`w-9 h-9 rounded-lg bg-${colorClass}/10 flex items-center justify-center`}
        >
          <Icon className={`w-4 h-4 text-${colorClass}`} />
        </div>
        <div>
          <h3 className="text-2xl/5 font-semibold text-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground">{subTitle}</span>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticCard;
