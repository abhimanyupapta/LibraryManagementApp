import React from "react";
import "./cartCard.css";

const CartCard = ({ image, name, id }) => {
  return (
    <div className="cart-card">
      <img src={image} alt="bookImg"></img>
      <div className="info">
        <h3>{name}</h3>
        <p>Book Id: {id}</p>
      </div>
      
    </div>
  );
};

export default CartCard;
