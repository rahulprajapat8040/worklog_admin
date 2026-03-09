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
