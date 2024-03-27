import type {
  RequestEvent,
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";
import type { AuthSession } from "~/types";

export const getSessionSS = (
  event: RequestEvent | RequestEventLoader | RequestEventAction,
) => {
  const session: AuthSession | null = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(
      302,
      `/api/auth/signin?callbackUrl=${event.url.pathname}`,
    );
  }
  return session;
};
