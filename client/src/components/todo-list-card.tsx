"use client";

import { useCallback, useEffect, useState } from "react";
import { AddItemForm } from "./add-new-item-form";
import { Spinner } from "./spinner";
// import { ItemDisplay } from "./item-display";

interface Item {
  id: number;
  name: string;
  // Add other item properties if necessary
}

export function TodoListCard() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    fetch("/api/items")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const onNewItem = useCallback((newItem: Item) => {
    setItems((prevItems) => (prevItems ? [...prevItems, newItem] : [newItem]));
  }, []);

  const onItemUpdate = useCallback(
    (item: Item) => {
      if (items) {
        const index = items.findIndex((i) => i.id === item.id);
        setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
      }
    },
    [items]
  );

  const onItemRemoval = useCallback(
    (item: Item) => {
      if (items) {
        const index = items.findIndex((i) => i.id === item.id);
        setItems([...items.slice(0, index), ...items.slice(index + 1)]);
      }
    },
    [items]
  );

  //   if (items === null) return <Spinner />;

  return (
    <>
      <AddItemForm onNewItem={onNewItem} />
      {items?.length === 0 && (
        <p className="text-center">No items yet! Add one above!</p>
      )}
      {/* {items.map((item) => (
        <ItemDisplay
          key={item.id}
          item={item}
          onItemUpdate={onItemUpdate}
          onItemRemoval={onItemRemoval}
        />
      ))} */}
    </>
  );
}
