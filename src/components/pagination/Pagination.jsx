import React from "react";
import { usePagination } from "../../hooks/usePagination";

const Pagination = ({ pageTotal, pageCurrent, setPage }) => {

    let pageArray = usePagination(pageTotal);

    return (
        <>
            {
                pageArray.length !== 0 &&
                <div className="pagination">
                    <span> Cтр.</span>
                    <ul style={{ marginBottom: '20px' }} className="pagination__list" >
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
                </div>
            }
        </>
    )
}

export default Pagination;