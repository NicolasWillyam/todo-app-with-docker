"use client";

import { useEffect, useState } from "react";

export function Greeting() {
  const [greeting, setGreeting] = useState(null);

  console.log(process.env.NEXT_PUBLIC_API_BASE);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/greeting`)
      .then((res) => res.json())
      .then((data) => setGreeting(data.greeting));
  }, [setGreeting]);

  if (!greeting) return null;

  return <h1 className="text-center text-xl font-semibold">{greeting}</h1>;
}
