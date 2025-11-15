import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home/index";
import { StudentDashboard } from "@/pages/StudentDashboard/index";
import { TeacherDashboard } from "@/pages/TeacherDashboard/index";
import { HelpOthers } from "@/pages/HelpOthers/index";
import { FindOut } from "@/pages/FindOut/index";

const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/student",
        element: <StudentDashboard />
    },
    {
        path: "/teacher",
        element: <TeacherDashboard />
    },
    {
        path: "/help-others",
        element: <HelpOthers />
    },
    {
        path: "/find-out",
        element: <FindOut />
    },
]

export const router = createBrowserRouter(routes);

