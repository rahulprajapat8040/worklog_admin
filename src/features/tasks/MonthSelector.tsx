"use client";
import DropDown from "@/components/ui/input/DropDown";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "jan-2026", label: "January 2026" },
  { value: "feb-2026", label: "February 2026" },
  { value: "march-2026", label: "March 2026" },
];

const MonthSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", val); // update month
    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/");
  };
  return (
    <div>
      <DropDown
        value={searchParams.get("month") || "jan-2026"}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

export default MonthSelector;
