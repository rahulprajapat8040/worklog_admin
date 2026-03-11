"use client";
import DropDown from "@/components/ui/input/DropDown";
import { IOption } from "@/lib/interfaces/common/common.interface";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  selectedMonth: string;
  options: IOption[];
}
const MonthSelector: React.FC<Props> = ({ selectedMonth, options }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", val);

    router.push(`?${params.toString()}`);
  };
  return (
    <div>
      <DropDown
        value={selectedMonth}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

export default MonthSelector;
