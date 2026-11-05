import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Game } from "@/game/Game";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

function Home() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on) {
    return (
      <main className="grid h-dvh place-items-center bg-bg font-display text-4xl text-fg">
        Rózsaszín óra
      </main>
    );
  }
  return <Game />;
}
