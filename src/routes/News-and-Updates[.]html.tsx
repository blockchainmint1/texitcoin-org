import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/News-and-Updates.html")({
  beforeLoad: () => {
    throw redirect({ to: "/blog", statusCode: 301 });
  },
});
