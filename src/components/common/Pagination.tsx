"use client";
import { IPageInfo } from "@/lib/interfaces/common/common.interface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

interface PaginationProps {
  paginationData: IPageInfo;
  pageLink: string;
}

const Pagination: React.FC<PaginationProps> = ({
  paginationData,
  pageLink,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalPage, currentpage } = paginationData;

  const pageNumbers = useMemo(() => {
    const pagesToShow = 5;
    let startPage = Math.max(1, currentpage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPage, startPage + pagesToShow - 1);

    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentpage, totalPage]);

  const navigateToPage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());

    const queryString = params.toString();
    const newUrl = queryString ? `${pageLink}?${queryString}` : pageLink;

    router.push(newUrl);
  };

  return (
    <>
      {totalPage > 1 && (
        <div className="flex items-center justify-end space-x-4 mt-3">
          <button
            onClick={() => currentpage > 1 && navigateToPage(currentpage - 1)}
            disabled={currentpage === 1}
            className="p-2 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronLeft />
          </button>

          {pageNumbers.map((pageNum) => (
            <button
              onClick={() => navigateToPage(pageNum)}
              key={pageNum}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium
                ${
                  currentpage === pageNum
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() =>
              currentpage < totalPage && navigateToPage(currentpage + 1)
            }
            disabled={currentpage === totalPage}
            className="p-2 text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
