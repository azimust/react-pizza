import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

const Pagination = ({ page, handlePage }) => {
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