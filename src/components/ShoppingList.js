import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((data) => setItems(data))
  }, [])

  const handleAddItemToList = (newItem) => {
    setItems([...items, newItem])
  }

  const handleAddItemToCart = (cartItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === cartItem.id) {
        return cartItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }
  
  const handleDeleteItem = (deletedItem) => {
    const updatedItems = items.filter((item) => {
      return item.id !== deletedItem.id
    })
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItemToList} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onAddItemToCart={handleAddItemToCart} onDeleteItem={handleDeleteItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
