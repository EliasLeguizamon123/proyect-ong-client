import React from 'react'
import ReactPaginate from 'react-paginate'
import '../static/Paginator.css'

const Paginator = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={'pagination justify-content-center'}
      pageLinkClassName={'page-link'}
      pageClassName={'page-item'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
    />
  )
}

export default Paginator
