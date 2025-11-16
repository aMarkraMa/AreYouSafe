import { createBrowserRouter, Navigate, useNavigate, useRouteError, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "@/pages/Home/index";
import { StudentDashboard } from "@/pages/StudentDashboard/index";
import { TeacherDashboard } from "@/pages/TeacherDashboard/index";
import { HelpOthers } from "@/pages/HelpOthers/index";
import { FindOut } from "@/pages/FindOut/index";
import { Splash } from "@/pages/Splash/index";
import { AboutUs } from "@/pages/AboutUs/index";
import { Login } from "@/pages/Login/index";
import { Register } from "@/pages/Register/index";
import "./ErrorPage.css";

function SplashThenHome() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home", { replace: true });
        }, 4100); // show splash for ~4 seconds before going to /home
        return () => clearTimeout(timer);
    }, [navigate]);
    return <Splash />;
}

// Composant pour gérer les erreurs 404
function ErrorPage() {
    const error = useRouteError() as { status?: number; statusText?: string; message?: string };
    
    return (
        <div className="error-page">
            <h1>
                {error?.status === 404 ? '404' : 'Erreur'}
            </h1>
            <p className="error-message">
                {error?.status === 404 
                    ? 'Page non trouvée' 
                    : error?.statusText || error?.message || 'Une erreur est survenue'}
            </p>
            <p className="error-description">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link to="/home" className="home-link">
                Retour à l'accueil
            </Link>
        </div>
    );
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
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
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
    {
        path: "/about",
        element: <AboutUs />
    },
    {
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
    },
]

export const router = createBrowserRouter(routes);

