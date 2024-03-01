"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  numItemsNow: number;
  itemsPerPage: number;
};

export function Pagination({ itemsPerPage, numItemsNow }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currOffset = Number(searchParams.get("offset") || "0");
  const hasPrevious = currOffset > 0;
  const hasNext = numItemsNow >= itemsPerPage;

  const previousPage = () => {
    if (!hasPrevious) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("offset", (currOffset - itemsPerPage).toString());
    router.replace(`${pathname}?${newSearchParams}`);
  };

  const nextPage = () => {
    if (!hasNext) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("offset", (25 + currOffset).toString());
    router.replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <div className="flex items-center justify-between">
      <button role="link" onClick={previousPage} disabled={!hasPrevious}>
        Previous page
      </button>
      <button role="link" onClick={nextPage} disabled={!hasNext}>
        Next page
      </button>
    </div>
  );
}
