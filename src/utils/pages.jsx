export function countPages(totalCount, limit) {
    return Math.ceil(totalCount / limit);
}

export function getPagination(pageCount) {
    const pagination = [];
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i);
    }
    return pagination;
}