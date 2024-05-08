import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
    const authStatus = "not-authenticated";
    // const authStatus = "authenticated";

    return (
        <Routes>
            {/* TODO */}
            {authStatus === 'authenticated' ? (
            <Route path="/*" element={<CalendarPage />} />
        ) : (
            <Route path="/auth/*" element={<LoginPage />} />
        )}

            <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
