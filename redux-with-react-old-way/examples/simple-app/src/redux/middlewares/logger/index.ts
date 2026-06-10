import type { Middleware } from "redux";
import type { RootState } from "../../store";

const loggerMiddleware: Middleware<{}, RootState> =
  () => (next) => (action) => {
    console.log("dispatching", action);
    return next(action);
  };

export default loggerMiddleware;
