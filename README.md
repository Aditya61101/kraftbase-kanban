# Kraftbase Kanban

This project is a Kanban board application built using React, Vite, Typescript and React Beautiful DND for drag-and-drop functionality, allowing users to manage tasks across different categories.

## How to run the project locally
1. Clone the repository
2. Make sure you have installed the latest version of Node.js; Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Tech stack used
1. React.js + Vite + Typescript for the frontend
2. React Beautiful DND for drag-and-drop functionality
3. React Router Dom for routing
4. React Hook Form + zod for form validation
5. Tailwind-css + shadcn/ui for styling
6. Zustand for state management

## Functionalities

1. Login and logout Functionality
2. Add, Delete a board
3. Add, Delete, Edit a task
4. Add, Delete, Edit a category
5. Drag and Drop tasks between categories and within the same category
6. Search and filter tasks by title and labels
7. Add, Delete, Edit labels in the edit task form

## Approach to the project
First, I gathered all the packages that I would need to create the project. Then I created the login page along with a Zustand store for it to store the email ID of the user. It has very basic login functionality, as it doesn't involve any backend.

Next I created a fully responsive board interface. The interface has an "add board" button to add new boards. I created a store for boards that has actions like addBoard and deleteBoard.
Each board has a delete icon and a navigate icon to direct the user to a specific board.

On the board page, we have four different categories by default. The user can add, delete, or edit the categories.
Each category has a plus button beside it, which is used to add a task. The task gets added directly into that category and gets updated in the global state as well using the addTask action implemented using Zustand.
The task can be edited as well as deleted using the editTask and deleteTask actions.

Next, I implemented search and filter functionality; it can filter tasks based on their title as well as the labels used as mentioned in the requirements.

Next, I implemented the drag-and-drop functionality. Before implementing, I have to go through its documentation to learn about draggable, droppable, and dragDropContext.
I have implemented a list of tasks within the category and among the categories as well.

## Challenges faced

1. The first challenge was to define what things and in which way they had to be stored in Zustand. This challenge took a lot of time. I have to go through the Zustand documentation to know how to persist the data in local storage.
2. Another challenge was implementing edit task functionality. I had to go through the documentation of the React Hook Form to understand how to implement it.
3. The main challenge was to implement the drag-and-drop functionality. I had to go through the documentation of React Beautiful DND to understand how it works, what its key components are, and how to implement it. The StrictMode warning was coming because of the react-beautiful-dnd library. I had to go to StackOverflow and watch some tutorials to get rid of it. The dragEnd function was also tedious to implement.
4. The last challenge was to implement search and filter functionality. I used global state to extract the search text, then filtered all the tasks based on it and displayed them.
























<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list -->
