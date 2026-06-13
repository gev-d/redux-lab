import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./index";

// Pre-typed versions of the react-redux hooks. Use these throughout the app
// instead of the plain `useDispatch` / `useSelector` so state and dispatch are
// fully typed without annotating every call site.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
