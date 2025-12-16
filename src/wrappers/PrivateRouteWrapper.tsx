import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router";
import LoadingSpinner from "../LoadingSpinner";

interface PrivateRouteWrapperProps {
  children: React.ReactNode;
  requireRoleSelection?: boolean;
}

export default function PrivateRouteWrapper({
  children,
  requireRoleSelection = true,
}: PrivateRouteWrapperProps) {
  const { user, loading, needsRoleSelection } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect new users to role selection (if required by this route)
  if (requireRoleSelection && needsRoleSelection) {
    return <Navigate to="/select-role" replace />;
  }

  return children;
}
