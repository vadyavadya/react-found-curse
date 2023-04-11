import { useMemo } from "react";

export function usePagination(pageCount) {
    let result = useMemo(() => {
        const pagination = [];
        for (let i = 1; i <= pageCount; i++) {
            pagination.push(i);
        }
        return pagination;
    }, [pageCount])

    return result
}

