import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/The-Case-for-TEXITcoin.html")({
  beforeLoad: () => {
    throw redirect({ to: "/whitepaper", statusCode: 301 });
  },
});
