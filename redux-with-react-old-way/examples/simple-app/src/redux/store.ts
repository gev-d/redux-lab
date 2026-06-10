import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import middlewares from "./middlewares";
import { thunk } from "redux-thunk";

const middlewareEnhancer = applyMiddleware(...middlewares, thunk);

const store = createStore(rootReducer, middlewareEnhancer);

export default store;

// Infer `RootState` from the root reducer (not the store) to avoid a circular
// type reference: store -> middleware -> RootState -> store.
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
