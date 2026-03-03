import { Check, ChevronDown } from "lucide-react";
import React, { useId } from "react";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

type SelectOption = string | { value: string; label: string };

interface FormFieldProps extends Omit<BaseProps, "type"> {
  label?: string;
  prefix?: string;
  suffix?: string | React.ReactNode;
  placeholder?: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "select"
    | "textarea"
    | "checkbox"
    | "radio"
    | "date"
    | "time"
    | "datetime";
  options?: SelectOption[];
  rows?: number;
  defaultChecked?: boolean;
  note?: string;
}

const wrapperBase =
  "w-full rounded-lg border border-input bg-background transition " +
  "hover:border-primary focus-within:border-primary " +
  "focus-within:ring-2 focus-within:ring-primary/30";

const inputBase =
  "w-full bg-transparent outline-none text-foreground " +
  "placeholder:text-foreground/60";

const Input: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  type = "text",
  prefix,
  suffix,
  options = [],
  rows = 3,
  name,
  note,
  defaultChecked = false,
  ...rest
}) => {
  const id = useId();

  /* ==============================
     LABEL
     ============================== */
  const FieldLabel = label ? (
    <label
      htmlFor={id}
      className="mb-2 inline-block text-sm font-medium text-foreground"
    >
      {label}
    </label>
  ) : null;

  /* ==============================
     SELECT
     ============================== */
  if (type === "select") {
    return (
      <div className="flex-1">
        {FieldLabel}
        <div className={`relative ${wrapperBase}`}>
          <select
            id={id}
            name={name}
            {...rest}
            className={`${inputBase} appearance-none px-3 py-2 pr-10 h-10.5`}
          >
            <option value="">Select an option</option>
            {options.map((opt, i) =>
              typeof opt === "string" ? (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ) : (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              )
            )}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
      </div>
    );
  }

  /* ==============================
     TEXTAREA
     ============================== */
  if (type === "textarea") {
    return (
      <div className="flex-1">
        {FieldLabel}
        <div className={wrapperBase}>
          <textarea
            id={id}
            name={name}
            rows={rows}
            placeholder={placeholder}
            {...rest}
            className={`${inputBase} px-3 py-2 resize-none`}
          />
        </div>
        {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
      </div>
    );
  }

  /* ==============================
     CHECKBOX
     ============================== */
  if (type === "checkbox") {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          {...rest}
          className="peer hidden"
        />

        <span
          className="
            flex h-5 w-5 items-center justify-center rounded
            border border-input
            transition
            peer-checked:bg-primary
            peer-checked:border-primary
            peer-focus-visible:ring-2
            peer-focus-visible:ring-primary/30
          "
        >
          <Check size={14} className="text-white opacity-0 peer-checked:opacity-100" />
        </span>

        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  }

  /* ==============================
     RADIO
     ============================== */
  if (type === "radio") {
    return (
      <label className="relative flex items-center gap-2 cursor-pointer">
        <input
          id={id}
          type="radio"
          name={name}
          defaultChecked={defaultChecked}
          {...rest}
          className="peer hidden"
        />

        <span
          className="
            h-5 w-5 rounded-full border border-input
            flex items-center justify-center
            peer-checked:border-primary
            peer-focus-visible:ring-2
            peer-focus-visible:ring-primary/30
          "
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100" />
        </span>

        <span className="text-sm text-foreground">{label}</span>
      </label>
    );
  }

  /* ==============================
     DATETIME (DATE + TIME)
     ============================== */
  if (type === "datetime") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Input type="date" label={`${label ?? "Date"}`} name={`${name}-date`} />
        <Input type="time" label={`${label ?? "Time"}`} name={`${name}-time`} />
      </div>
    );
  }

  /* ==============================
     DEFAULT INPUT
     ============================== */
  return (
    <div className="flex-1">
      {FieldLabel}
      <div className={`${wrapperBase} flex items-center px-3 py-2`}>
        {prefix && (
          <span className="mr-2 border-r border-border pr-2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          {...rest}
          className={inputBase}
        />

        {suffix && <span className="ml-2 text-muted-foreground">{suffix}</span>}
      </div>

      {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
    </div>
  );
};

export default Input;