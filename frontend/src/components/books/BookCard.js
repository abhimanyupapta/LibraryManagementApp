import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import "./BookCard.css";
import { useDispatch, useSelector } from "react-redux";
import { likeBook } from "../../features/books/likeSlice";
import { Link } from "react-router-dom";

const BookCard = ({
  csrfToken,
  bookId,
  image_url,
  name,
  description,
  likes,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [numLikes, setNumLikes] = useState(likes.length);

  const Liked =
    likes.length === 0
      ? false
      : likes.find((l) => l.user.toString() === user._id.toString());

  const [isLiked, setIsLiked] = useState(Liked);

  const likeBookFn = (e) => {
    e.preventDefault();
    dispatch(likeBook({ bookId, csrfToken }));

    if (isLiked) {
      setNumLikes(numLikes - 1);
    } else {
      setNumLikes(numLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Link to={`/books/${bookId}`} >
        <div className="book-card">
        <div className="book-pic">
          <img src={image_url} alt="book image"></img>
        </div>
        <div className="book-name">
          <p>{name}</p>
        </div>
        <div className="book-description">
          <p>{description}</p>
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
        </div>
      </Link>
    </>
  );
};

export default BookCard;
