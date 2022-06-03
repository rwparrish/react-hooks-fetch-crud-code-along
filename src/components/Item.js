import React from "react";

function Item({ item, onAddItemToCart, onDeleteItem }) {

  const handleAddToCartClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
      .then((resp) => resp.json())
      .then((updatedItem) => onAddItemToCart(updatedItem))
  }

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => onDeleteItem(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDeleteClick} className="remove">Delete</button>
    </li>
  );
}

export default Item;
