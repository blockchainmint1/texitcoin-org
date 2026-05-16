import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/Meet-the-Team.html")({
  beforeLoad: () => {
    throw redirect({ to: "/team", statusCode: 301 });
  },
});
