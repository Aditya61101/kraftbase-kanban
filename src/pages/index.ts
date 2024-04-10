import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/login"));
const BoardsPage = lazy(() => import("@/pages/boards"));
const BoardPage = lazy(() => import("@/pages/board"));

export {
    LoginPage,
    BoardsPage,
    BoardPage
}