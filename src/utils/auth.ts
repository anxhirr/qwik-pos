import type {
  RequestEvent,
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";
import type { AuthSession } from "../../types";

export const getSessionSS = (
  event: RequestEvent | RequestEventLoader | RequestEventAction,
) => {
  const session: AuthSession | null = event.sharedMap.get("session");
  return session;
};
