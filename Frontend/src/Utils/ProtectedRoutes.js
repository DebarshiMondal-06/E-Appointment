import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export function SignInAuth({ children }) {
  const [cookie] = useCookies();
  return !cookie.user_data ? children : <Navigate to="/dashboard" />;
};

export function ProtectAuth({ children }) {
  const [cookie] = useCookies();
  return !cookie.user_data ? children : <Navigate to="/auth" />;
}