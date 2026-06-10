# ⚛️ Redux with React — the "Old Way"

Building a todo app with classic Redux patterns (no Redux Toolkit), wired into React.

## 🛠️ Tech Stack

`redux` · `react` · `react-redux` · `reselect` · `immer`

---

## 🔌 Redux Middleware

Redux middleware provides a **third-party extension point** between dispatching an action and the moment it reaches the reducer.

People use Redux middleware for:

- 📝 Logging
- 💥 Crash reporting
- 🌐 Talking to an asynchronous API
- 🧭 Routing
- …and more

### So how does that work?

Middleware form a **pipeline** around the store's `dispatch` method. When we call `store.dispatch(action)`, we're actually calling the *first* middleware in the pipeline. That middleware can then do anything it wants when it sees the action:

1. It checks whether the action is a specific type it cares about — much like a reducer would.
2. If it's the right type → it might run some **custom logic**.
3. Otherwise → it passes the action to the **next** middleware in the pipeline.

> ℹ️ Unlike a reducer, middleware **can have side effects** inside — including timeouts and other async logic.

---

> 💡 **Tip — where should state live?**
> In a React + Redux app, your **global state** should go in the Redux store, and your **local state** should stay in React components.

If you're not sure where to put something, here are some common rules of thumb for what belongs in Redux:

- [ ] Do other parts of the application care about this data?
- [ ] Do you need to be able to create further **derived data** based on it?
- [ ] Is the same data being used to drive **multiple components**?
- [ ] Is there value in being able to **restore this state** to a given point in time (*time-travel debugging*)?
- [ ] Do you want to **cache** the data (use what's in state if it's already there instead of re-requesting)?
- [ ] Do you want to keep this data consistent while **hot-reloading** UI components?

---

## ⏳ Redux Middleware and Side Effects

By itself, a Redux store **doesn't know anything about async logic**. It only knows how to:

- Synchronously **dispatch actions**
- Update the state by calling the **root reducer** function
- **Notify the UI** that something has changed

> Any asynchronicity has to happen **outside** the store.

### 🧵 Thunks

The word **"thunk"** is a programming term that means *"a piece of code that does some delayed work"*. For more details, see the thunk usage guide.

---

## 🏭 Action Creators

In our small todo app, writing action objects by hand every time isn't too difficult. In fact, by switching to action creators we've *added* more work — now we have to write a function **and** the action object.

But what if we needed to dispatch the same action from **many parts** of the application? Or what if there's some additional logic to run every time we dispatch (like creating a unique ID)? We'd end up copy-pasting that setup logic everywhere.

**Action creators have two primary purposes:**

1. 🧱 They **prepare and format** the contents of action objects.
2. 📦 They **encapsulate** any additional work needed whenever we create those actions.

> ✅ That way, we have a **consistent approach** for creating actions — whether or not there's extra work to do. The same goes for **thunks** as well.
