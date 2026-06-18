RTK Query is an advanced data fetching and caching tool, designed to simplify common cases for loading data in a web application. RTK Query itself is built on top of the Redux Toolkit core, and leverages RTK's APIs like createSlice and createAsyncThunk to implement its capabilities.

RTK Query Overview
RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

RTK Query is included in the Redux Toolkit package, and its functionality is built on top of the other APIs in Redux Toolkit. We recommend RTK Query as the default approach for data fetching in Redux apps.

---

Motivation
Web applications normally need to fetch data from a server in order to display it. They also usually need to make updates to that data, send those updates to the server, and keep the cached data on the client in sync with the data on the server. This is made more complicated by the need to implement other behaviors used in today's applications:

Tracking loading state in order to show UI spinners
Avoiding duplicate requests for the same data
Optimistic updates to make the UI feel faster
Managing cache lifetimes as the user interacts with the UI
We've already seen how we can implement these behaviors using Redux Toolkit.

However, originally Redux didn't include anything built in to help completely solve these use cases. Even when we use createAsyncThunk together with createSlice, there's still a fair amount of manual work involved in making requests and managing loading state. We have to create the async thunk, make the actual request, pull relevant fields out of the response, add loading state fields, add handlers in extraReducers to handle the pending/fulfilled/rejected cases, and actually write the proper state updates.

Over time, the React community has come to realize that "data fetching and caching" is really a different set of concerns than "state management". While you can use a state management library like Redux to cache data, the use cases are different enough that it's worth using tools that are purpose-built for the data fetching use case.

---

Bundle Size
RTK Query adds a fixed one-time amount to your app's bundle size. Since RTK Query builds on top of Redux Toolkit and React-Redux, the added size varies depending on whether you are already using those in your app. The estimated min+gzip bundle sizes are:

If you are using RTK already: ~9kb for RTK Query and ~2kb for the hooks.
If you are not using RTK already:
Without React: 17 kB for RTK+dependencies+RTK Query
With React: 19kB + React-Redux, which is a peer dependency

---

Your application is expected to have only one createApi call in it. This one API slice should contain all endpoint definitions that talk to the same base URL. For example, endpoints /api/posts and /api/users are both fetching data from the same server, so they would go in the same API slice. If your app does fetch data from multiple servers, you can either specify full URLs in each endpoint, or if absolutely necessary create separate API slices for each server.

Endpoints are normally defined directly inside the createApi call. If you're looking to split up your endpoints between multiple files, see the "Injecting Endpoints" section in Part 8 section of the docs!

---

You should normally use the query hooks to access cached data in components - you shouldn't write your own useSelector calls to access fetched data or useEffect calls to trigger fetching!
If you need the same data in multiple components, just call the same query hook with the same arguments in each component! For example, you can call useGetPostQuery('123') in three different components, and RTK Query will make sure the data is only fetched once, and each component will re-render as needed.

