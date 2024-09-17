import Container from "@/components/container";
import { Greeting } from "@/components/greeting";
import { TodoListCard } from "@/components/todo-list-card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-10 py-10">
      <Greeting />
      <TodoListCard />
    </div>
  );
}
