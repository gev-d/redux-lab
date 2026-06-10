theckonloges used => redux, react, react-redux, reselect, immer,

Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

So how does that work?

Middleware form a pipeline around the store's dispatch method. When we call store.dispatch(action), we're actually calling the first middleware in the pipeline. That middleware can then do anything it wants when it sees the action. Typically, a middleware will check to see if the action is a specific type that it cares about, much like a reducer would. If it's the right type, the middleware might run some custom logic. Otherwise, it passes the action to the next middleware in the pipeline.

Unlike a reducer, middleware can have side effects inside, including timeouts and other async logic.

//////////

tip
In a React + Redux app, your global state should go in the Redux store, and your local state should stay in React components.

If you're not sure where to put something, here are some common rules of thumb for determining what kind of data should be put into Redux:

Do other parts of the application care about this data?
Do you need to be able to create further derived data based on this original data?
Is the same data being used to drive multiple components?
Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
Do you want to keep this data consistent while hot-reloading UI components (which may lose their internal state when swapped)?

/////

Redux Middleware and Side Effects

By itself, a Redux store doesn't know anything about async logic. It only knows how to synchronously dispatch actions, update the state by calling the root reducer function, and notify the UI that something has changed. Any asynchronicity has to happen outside the store.

The word "thunk" is a programming term that means "a piece of code that does some delayed work". For more details on how to use thunks, see the thunk usage guide page:

/////

In our small example todo app, writing action objects by hand every time isn't too difficult. In fact, by switching to using action creators, we've added more work - now we have to write a function and the action object.

But, what if we needed to dispatch the same action from many parts of the application? Or what if there's some additional logic that we have to do every time we dispatch an action, like creating a unique ID? We'd end up having to copy-paste the additional setup logic every time we need to dispatch that action.

Action creators have two primary purposes:

They prepare and format the contents of action objects
They encapsulate any additional work needed whenever we create those actions
That way, we have a consistent approach for creating actions, whether or not there's any extra work that needs to be done. The same goes for thunks as well.
