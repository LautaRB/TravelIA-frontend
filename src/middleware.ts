import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const cookies = context.request.headers.get("cookie") || "";
  const hasToken = cookies.includes("authToken=");
  const url = new URL(context.request.url);

  /*if (url.pathname.startsWith("/dashboard/dashboard") && !hasToken) {
    return context.redirect("/login");
  }

  if (url.pathname === "/login" && hasToken) {
    return context.redirect("/dashboard/dashboard");
  }*/

  if (url.pathname.startsWith("/dashboard/dashboard/index.html") && !hasToken) {
    return context.redirect("/login/index.html");
  }

  if (url.pathname === "/login/index.html" && hasToken) {
    return context.redirect("/dashboard/dashboard/index.html");
  }


  return next();
};
