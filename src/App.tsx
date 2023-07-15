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
  const handleAddItem = (newItem: ItemType) => {
    setItems((items) => [...items, newItem]);
  };
  const handleDeleteItem = (itemID: number) => {
    setItems((items) => items.filter((item) => item.id !== itemID));
  };
  const handleCheckedItem = (itemID: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === itemID ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckedItem={handleCheckedItem}
      />
      <Stats items={items} />
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
  onDeleteItem: (itemID: number) => void;
  onCheckedItem: (itemID: number) => void;
};

//comp-PackingList
const PackingList: React.FC<PackingListType> = ({
  items,
  onDeleteItem,
  onCheckedItem,
}) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            deleteItem={onDeleteItem}
            checkedItem={onCheckedItem}
            renderItem={item}
          />
        ))}
      </ul>
    </div>
  );
};

//type-ItemCompType
type ItemCompType = {
  deleteItem: (itemID: number) => void;
  checkedItem: (itemID: number) => void;
  renderItem: ItemType;
};

//comp-Item
const Item: React.FC<ItemCompType> = ({
  deleteItem,
  renderItem,
  checkedItem,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={renderItem.packed}
        onChange={() => checkedItem(renderItem.id)}
      />
      <span style={renderItem.packed ? { textDecoration: "line-through" } : {}}>
        {renderItem.quantity} {renderItem.itemName}
      </span>

      <button onClick={() => deleteItem(renderItem.id)}>❌</button>
    </li>
  );
};

//type-StatsType
type StatsType = {
  items: ItemType[];
};
//comp-Stats
const Stats: React.FC<StatsType> = ({ items }) => {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding items to your packing list 🧳</em>
      </footer>
    );

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItems / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {packedPercentage == 100
          ? `You got everything! You're ready to go ✈️`
          : `You have ${totalItems} items on your list. You've already packed ${packedItems} items (${packedPercentage}%)`}
      </em>
    </footer>
  );
};

export default App;
