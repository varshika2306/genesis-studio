import { Outlet, createFileRoute } from "@tanstack/react-router";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Dock } from "@/components/workspace/Dock";
import { TopNav } from "@/components/workspace/TopNav";

export const Route = createFileRoute("/app")({ component: AppLayout });

function AppLayout() {
  return (
    <div className="relative min-h-screen">
      <NeuralBackground />
      <TopNav />
      <Dock />
      <main className="pl-24 pr-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
