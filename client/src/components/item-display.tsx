import { Trash, Trash2Icon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

interface Props {
  item: Item;
  onItemUpdate: (item: Item) => void;
  onItemRemoval: ((...args: any[]) => any) | null | undefined;
}

export function ItemDisplay({ item, onItemUpdate, onItemRemoval }: Props) {
  const toggleCompletion = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/items/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: item.name,
        completed: !item.completed,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(onItemUpdate);
  };

  const removeItem = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/items/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
        if (onItemRemoval) {
          onItemRemoval(item); // Call onItemRemoval only if it is defined
        }
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  return (
    <div className="w-[640px] flex space-x-2 items-center justify-between gap-2">
      <div className="flex items-start w-fit">
        <Checkbox onClick={toggleCompletion} className="mt-1 mx-2.5" />
        <p className={cn(item.completed ? `line-through italic` : ``, "")}>
          {item.name}
        </p>
      </div>
      <div className="h-8 w-8 rounded-full hover:bg-primary/5 duration-300 flex items-center justify-center">
        <Trash2Icon onClick={removeItem} className="w-4 h-4 cursor-pointer" />
      </div>
    </div>
  );
}
