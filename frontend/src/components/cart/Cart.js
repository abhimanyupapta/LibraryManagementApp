import React, { useEffect } from "react";
import { getCart, delCart } from "../../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartCard from "./CartCard.js";
import "./cart.css";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { csrfToken } = useSelector((state) => state.csrf);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div className="main-cart">
            <h1>Cart Items</h1>
            {cart.books && cart.books.length !== 0 ? (
              cart.books.map((b) => (
                <div key={1} className="card">
                  <CartCard
                    key={b._id}
                    image={b.image}
                    name={b.name}
                    id={b.book}
                  />
                  <button
                    key={2}
                    onClick={() => dispatch(delCart({ id: b.book, csrfToken }))}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No Books in Your Cart...</p>
            )}
            {cart.books && cart.books.length !== 0 && (
              <button
                onClick={() => navigate("/issue/confirm")}
                className="issue-btn"
              >
                Confirm Issue
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
