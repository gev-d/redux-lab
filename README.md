# 🗂️ redux-lab

> A JavaScript library for **predictable** and **maintainable** global state management.

A hands-on lab for learning Redux from the ground up — core concepts, middleware, thunks, and React bindings.

---

## ✨ Why Redux?

|     | Pillar          | What it gives you                                                                                                                          |
| --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔮  | **Predictable** | Apps behave consistently, run in different environments (client, server, and native), and are easy to test.                                |
| 🎯  | **Centralized** | Centralizing your app's state and logic unlocks powerful capabilities like undo/redo, state persistence, and much more.                    |
| 🐞  | **Debuggable**  | Redux DevTools make it easy to trace when, where, why, and how state changed — log changes, use _time-travel debugging_, and ship reports. |
| 🧩  | **Flexible**    | Works with any UI layer and has a large ecosystem of addons to fit your needs.                                                             |

---

## 🤔 Why Should I Use Redux?

Redux helps you manage **"global" state** — state that is needed across many parts of your application.

### Redux is more useful when:

- 📦 You have **large amounts of application state** needed in many places in the app
- 🔄 The app state is **updated frequently** over time
- 🧠 The logic to update that state may be **complex**
- 👥 The app has a **medium or large-sized codebase** and might be worked on by many people

> ⚠️ **Not all apps need Redux.** Take some time to think about the kind of app you're building, and decide what tools would be best to help solve the problems you're working on.

---

> 💡 **Rule of thumb**
> Global state that is needed across the app should go in the **Redux store**.
> State that's only needed in one place should be kept in **component state**.
