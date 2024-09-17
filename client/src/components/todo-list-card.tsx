"use client";

import { useCallback, useEffect, useState } from "react";
import { AddItemForm } from "./add-new-item-form";
import { Spinner } from "./spinner";
import { ItemDisplay } from "./item-display";
import { Skeleton } from "./ui/skeleton";

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export function TodoListCard() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/items`)
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

  const getRandomWidth = () => {
    // Generate a random width between 150px and 300px
    return `${Math.floor(Math.random() * (300 - 150 + 1)) + 150}px`;
  };
  const skeletons = Array.from({ length: 5 }, (_, index) => (
    <Skeleton
      key={index}
      className={`h-5 w-[${getRandomWidth()}] rounded-sm`}
    />
  ));

  if (items === null)
    return (
      <div className="flex flex-col space-y-10 justify-center items-center">
        <Skeleton className="h-[24px] w-[200px] rounded-sm mt-1" />
        <div className="flex gap-1">
          <Skeleton className="h-[40px] w-[540px] rounded-sm" />
          <Skeleton className="h-[40px] w-[90px] rounded-sm" />
        </div>
        <div className="w-full space-y-6">{skeletons}</div>
      </div>
    );

  return (
    <>
      <AddItemForm onNewItem={onNewItem} />
      {items?.length === 0 && (
        <p className="text-center">No items yet! Add one above!</p>
      )}
      <div className="w-full flex flex-col gap-2.5 items-center">
        {items.map((item) => (
          <ItemDisplay
            key={item.id}
            item={item}
            onItemUpdate={onItemUpdate}
            onItemRemoval={onItemRemoval}
          />
        ))}
      </div>
    </>
  );
}
