"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  placeholder?: string;
  pageLink: string;
}

const Searchbar: React.FC<Props> = ({
  placeholder = "Search for anything....",
  pageLink,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || ""
  );

  const debounceValue = useDebounce(searchValue);
  useEffect(() => {
    if (!pageLink) return;

    const params = new URLSearchParams(window.location.search);

    if (!debounceValue.trim()) {
      params.delete("search");
    } else {
      params.set("search", debounceValue.trim());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pageLink}?${queryString}` : pageLink;

    const currentUrl = window.location.pathname + window.location.search;

    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [debounceValue, pageLink, router]);

  return (
    <div className="text-muted-foreground flex items-center gap-3 border border-border py-2.5 px-3 rounded-md">
      <Search size={16} />
      <input
        type="text"
        className="outline-none border-0 text-sm flex-1"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
