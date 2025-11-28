import { Navigate } from "react-router-dom";
import { hasToken } from "./useAuth";

export default function ProtectedRoute({ children }) {
  if (!hasToken()) return <Navigate to="/login" replace />;
  return children;
}
