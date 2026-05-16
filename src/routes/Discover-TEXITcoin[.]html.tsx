import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/Discover-TEXITcoin.html")({
  beforeLoad: () => {
    throw redirect({ to: "/proof-of-work", statusCode: 301 });
  },
});
