import useClickOutSide from "@/hooks/useClickOutSide";
import { IOption } from "@/lib/interfaces/common/common.interface";
import { Check, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

interface Prop {
  value: string;
  options: IOption[];
  onChange: (value: string) => void;
}

const DropDown: React.FC<Prop> = ({ value, options, onChange }) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useClickOutSide({ ref, handler: () => setOpen(false), enabled: open });
  const selected = options.find(
    (v) => v.value.toLowerCase() === value.toLowerCase()
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative text-muted-foreground w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border border-border rounded-md p-2"
      >
        <span>{selected?.label ?? "Select option"}</span>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border border-border rounded-md shadow-lg z-50">
          {options.map((item) => {
            const isSelected = item.value === selected?.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item.value)}
                className="flex w-full items-center gap-3 px-3 py-2 hover:bg-gray-100"
              >
                <span className="w-5">{isSelected && <Check size={16} />}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
