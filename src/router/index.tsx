import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "@/pages/Home/index";
import { StudentDashboard } from "@/pages/StudentDashboard/index";
import { TeacherDashboard } from "@/pages/TeacherDashboard/index";
import { HelpOthers } from "@/pages/HelpOthers/index";
import { FindOut } from "@/pages/FindOut/index";
import { Splash } from "@/pages/Splash/index";

function SplashThenHome() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home", { replace: true });
        }, 1800); // 显示约1.8秒的动画后进入首页
        return () => clearTimeout(timer);
    }, [navigate]);
    return <Splash />;
}

const routes = [
    {
        path: "/splash",
        element: <Splash />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/",
        element: <SplashThenHome />
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

