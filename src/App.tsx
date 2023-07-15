import { useState } from "react";
import React from "react";
import "./App.css";

//type-ItemType
type ItemType = {
  id: number;
  itemName: string;
  quantity: number;
  packed: boolean;
};

//comp-App
const App = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const handleAddItems = (newItem: ItemType) => {
    setItems((items) => [...items, newItem]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
};

//comp-Logo
const Logo = () => {
  return <h1>Travel Check</h1>;
};

//type-FormType
type FormType = {
  onAddItem: (onAddItem: ItemType) => void;
};
//comp-Form
const Form: React.FC<FormType> = ({ onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!itemName) return;

    const newItem: ItemType = {
      id: Date.now(),
      itemName,
      quantity,
      packed: false,
    };
    onAddItem(newItem);

    setItemName("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

//type-PackingListType
type PackingListType = {
  items: ItemType[];
};

//comp-PackingList
const PackingList: React.FC<PackingListType> = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

//comp-Item
const Item = (props: ItemType) => {
  return (
    <li>
      <span style={props.packed ? { textDecoration: "line-through" } : {}}>
        {props.quantity} {props.itemName}
      </span>

      <button>❌</button>
    </li>
  );
};

//comp-Stats
const Stats = () => {
  return (
    <footer className="stats">
      <em>You have x items on your list. You've already packed y items (z%)</em>
    </footer>
  );
};

export default App;
