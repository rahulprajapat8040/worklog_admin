import { TaskStatus } from "./enum";

export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
  }).format(date);
  return formattedDate;
};

export const formatTimeTaken = (time: string) => {
  const split = time.split(":");
  return `${split[0]}h ${split[1]}m`;
};

export const statusColors: Record<TaskStatus, { class: string; text: string }> =
  {
    DONE: { class: "bg-success/10 text-success", text: "Done" },
    PARTIAL: { class: "bg-warning/10 text-warning", text: "Partial" },
    HOLD: { class: "bg-destructive/10 text-destructive", text: "Hold" },
    CANCELED: { class: "bg-destructive/10 text-destructive", text: "Canceled" },
    WORKING: { class: "bg-destructive/10 text-destructive", text: "Working" },
  };

export const GetFilterUrl = (filter: Object) => {
  return filter
    ? Object?.entries(filter)
        ?.filter(([, value]) => value)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : "";
};

export const formatMonth = (date: Date) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  return `${months[date.getMonth()]}-${date.getFullYear()}`;
};

export const formatLabel = (date: Date) => {
  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

export const getMonthOptions = (selectedMonth: string) => {
  const today = new Date();
  const currentMonth = formatMonth(today);

  const [mon, year] = selectedMonth.split("-");
  const monthIndex = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ].indexOf(mon);

  const selectedDate = new Date(Number(year), monthIndex, 1);

  const months: Date[] = [];

  if (selectedMonth === currentMonth) {
    // current month -> show previous 2
    months.push(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 2)
    );
    months.push(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
    months.push(selectedDate);
  } else {
    // selected month -> show prev + next
    months.push(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
    months.push(selectedDate);
    months.push(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  }

  return months.map((m) => ({
    value: formatMonth(m),
    label: formatLabel(m),
  }));
};
