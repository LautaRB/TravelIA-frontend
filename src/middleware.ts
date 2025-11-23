import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const cookies = context.request.headers.get("cookie") || "";
  const hasToken = cookies.includes("authToken=");
  const url = new URL(context.request.url);

  if (url.pathname.startsWith("/dashboard/dashboard") && !hasToken) {
    return context.redirect("/login");
  }

  if (url.pathname === "/login" && hasToken) {
    return context.redirect("/dashboard/dashboard");
  }

  return next();
};
