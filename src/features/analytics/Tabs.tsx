"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Tabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "my-insights";

  const Buttons = [
    { value: "my-insights", label: "My Insights" },
    { value: "team", label: "Team" },
    { value: "executive", label: "Executive" },
  ];

  const navigateToTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    const queryString = params.toString();
    const newUrl = queryString ? `analytics?${queryString}` : "analytics";

    router.push(newUrl);
  };

  return (
    <div className="flex bg-muted p-1 rounded-lg w-fit">
      {Buttons.map((item) => {
        const isActive = activeTab === item.value;

        return (
          <button
            key={item.value}
            onClick={() => navigateToTab(item.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
