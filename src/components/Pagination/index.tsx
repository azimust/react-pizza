import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

interface IPagination {
    page: number,
    handlePage: (selectedPage: number) => number
}

const Pagination = ({ page, handlePage }: IPagination) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => handlePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={4}
            forcePage={page - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination