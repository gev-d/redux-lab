Core Concepts and Principles

//

Single Source of Truth
The global state of your application is stored as an object inside a single store. Any given piece of data should only exist in one location, rather than being duplicated in many places.

This makes it easier to debug and inspect your app's state as things change, as well as centralizing logic that needs to interact with the entire application.

tip
This does not mean that every piece of state in your app must go into the Redux store! You should decide whether a piece of state belongs in Redux or your UI components, based on where it's needed.

///

