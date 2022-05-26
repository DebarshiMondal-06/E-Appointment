import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export function SignInAuth({ children }) {
  const [cookie] = useCookies();
  return !cookie.user_data ? children : <Navigate to="/dashboard" />;
};

export function ProtectAuth({ children }) {
  const [cookie] = useCookies();
  return cookie.user_data ? children : <Navigate to="/auth" />;
};

export function ProtectAdmin({ children }) {
  const [cookie] = useCookies();
  const { user_role } = cookie.user_data || {};
  return user_role && user_role === 'admin'
    ? children
    : <Navigate to="/dashboard" />;
};


export function ProtectAdminDoctor({ children }) {
  const [cookie] = useCookies();
  const { user_role } = cookie.user_data || {};
  return user_role && (user_role === 'admin' || user_role === 'doctor')
    ? children
    : <Navigate to="/dashboard" />;
};

export function ProtectDoctor({ children }) {
  const [cookie] = useCookies();
  const { user_role } = cookie.user_data || {};
  return user_role && user_role === 'doctor'
    ? children
    : <Navigate to="/dashboard" />;
};

// export function ProtectPatient({ children }) {
//   const [cookie] = useCookies();
//   const { user_role } = cookie.user_data || {};
//   return user_role && user_role === 'patient'
//     ? children
//     : <Navigate to="/dashboard" />;
// };