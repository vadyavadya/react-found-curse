import React from "react";
import { usePagination } from "../../hooks/usePagination";

const Pagination = ({ pageTotal, pageCurrent, setPage }) => {

    let pageArray = usePagination(pageTotal);

    return (
        <ul style={{ marginBottom: '20px' }} className="pagination">
            {pageArray && <span>Стр.</span>}
            {pageArray.map((item) =>
                <li key={item} className={pageCurrent === item
                    ? 'pagination__item pagination__item_active'
                    : 'pagination__item'}
                    onClick={() => {
                        setPage(item);
                    }}
                >
                    {item}
                </li>)
            }

        </ul>
    )
}

export default Pagination;