As you've seen, many aspects of Redux involve writing some code that can be verbose, such as immutable updates, action types and action creators, and normalizing state. There's good reasons why these patterns exist, but writing that code "by hand" can be difficult. In addition, the process for setting up a Redux store takes several steps, and we've had to come up with our own logic for things like dispatching "loading" actions in thunks or processing normalized data. Finally, many times users aren't sure what "the right way" is to write Redux logic.

That's why the Redux team created Redux Toolkit: our official, opinionated, "batteries included" toolset for efficient Redux development.

Redux Toolkit contains packages and functions that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.

Purpose
The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

"Configuring a Redux store is too complicated"
"I have to add a lot of packages to get Redux to do anything useful"
"Redux requires too much boilerplate code"

