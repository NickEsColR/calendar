import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
    // const authStatus = "not-authenticated";
    // const authStatus = "authenticated";
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === "checking") {
        return <h3>Cargando...</h3>;
    }

    return (
        <Routes>
            {/* TODO */}
            {status === "authenticated" ? (
                <>
                    <Route path="/" element={<CalendarPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/auth/login" />} />
                </>
            )}
        </Routes>
    );
};
