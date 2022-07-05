import React, { useEffect, useState } from "react";
import { getCart } from "../../features/cart/cartSlice";
import { postIssue } from "../../features/issue/issueSlice";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "../cart/CartCard";
import {useNavigate} from "react-router-dom"
import "./confirmIssue.css";

const ConfirmIssue = () => {
  const navigate = useNavigate();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { csrfToken } = useSelector((state) => state.csrf);

  const [issueTill, setIssueTill] = useState("");

  const issueSubmit = (e) => {
    e.preventDefault();
   

    dispatch(postIssue({books : cart.books, issuedTill : issueTill, csrfToken}));
    navigate("/books")
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <h1 className="title">Confirm Book Issue</h1>
          <div className="main-issue">
            <div className="issue-left">
              {cart.books && cart.books.length !== 0 ? (
                cart.books.map((b) => (
                  <div key={1} className="card">
                    <CartCard
                      key={b._id}
                      image={b.image}
                      name={b.name}
                      id={b.book}
                    />
                  </div>
                ))
              ) : (
                <p>No Books in Your Cart...</p>
              )}
            </div>
            {cart.books && cart.books.length !== 0 && (
              <div className="issue-right">
                <form className="issue-form" onSubmit={issueSubmit}>
                  <label for="date">Issue Till :-</label>
                  <input
                    type="date"
                    required
                    id="date"
                    value={issueTill}
                    onChange={(e) => setIssueTill(e.target.value)}
                  ></input>
                  <input
                    className="issue-btn"
                    Type="submit"
                    value="Place Issue"
                  ></input>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmIssue;
