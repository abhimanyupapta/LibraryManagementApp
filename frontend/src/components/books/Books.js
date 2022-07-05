import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getBooks } from "../../features/books/booksSlice";
import BookCard from "./BookCard";
import "./Books.css";
import Pagination from "react-js-pagination";

function Books() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    isLoading,
    error,
    books,
    bookCount,
    resultPerPage,
    filteredBooksCount,
  } = useSelector((state) => state.books);

  console.log(resultPerPage);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredBooksCount;

  const { csrfToken } = useSelector((state) => state.csrf);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(
      getBooks({
        keyword: "",
        currentPage,
        ratings: 0,
        category: null,
      })
    );
  }, [alert, error, dispatch, currentPage]);

  console.log(books);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="title">All Books</h1>

          {books &&
            books.map((b) => (
              <BookCard
                key={b._id}
                csrfToken={csrfToken}
                bookId={b._id}
                image_url={b.image.image_url}
                name={b.name}
                description={b.description}
                likes={b.likes}
              />
            ))}

          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={bookCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </>
      )}
    </>
  );
}

export default Books;
