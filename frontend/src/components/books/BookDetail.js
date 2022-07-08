import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./bookDetails.css";
import { useAlert } from "react-alert";
import { getBook } from "../../features/books/bookDetailSlice";
import { likeBook } from "../../features/books/likeSlice";
import { submitReview } from "../../features/books/reviewSlice";
import { postCart } from "../../features/cart/cartSlice";
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ReviewCard from "./ReviewCard.js";
const BookDetail = () => {
  const alert = useAlert();

  const { id } = useParams();

  const { book, iniLikes, isLoading, error } = useSelector(
    (state) => state.bookDetails
  );

 

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const {cartError} = useSelector(state => state.cart);

  const [numLikes, setNumLikes] = useState(iniLikes);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const Liked =
    iniLikes === 0
      ? false
      : book.likes.find((l) => l.user.toString() === user._id.toString());

  const [isLiked, setIsLiked] = useState(Liked);

  const likeBookFn = (e) => {
    e.preventDefault();
    const bookId = id;
    dispatch(likeBook({ bookId}));

    if (isLiked) {
      setNumLikes(numLikes - 1);
    } else {
      setNumLikes(numLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("bookId", id);
    myForm.set("comment", comment);

    dispatch(submitReview([myForm]));

    setOpen(false);
  };

  const issueHandler = () => {
    
    dispatch(postCart({ bookId: id}));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if(cartError) {
      alert.error(cartError);
    }
    dispatch(getBook(id));
  }, [error, alert, id, cartError]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="main">
            <div className="left">
              <img src={book.image.image_url}></img>
            </div>
            <div className="right">
              <div className="details">
                <h2 className="name">{book.name}</h2>
                <p className="id">Book Id : {book._id}</p>
                <p className="info">{book.description}</p>
              </div>
              <div className="like">
                <button onClick={likeBookFn}>
                  <AiOutlineLike
                    className={isLiked ? "green" : "not-liked"}
                    size={15}
                  />
                </button>

                <p>{numLikes}</p>
              </div>
              <div className="submit-review">
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <button onClick={issueHandler} className="add-to-issues">Issue This Book</button>
            </div>
          </div>
          {book.reviews && book.reviews[0] ? (
            <div className="reviews">
              {book.reviews &&
                book.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default BookDetail;
