import ViewModules from "./ViewModules";
import SharedModules from "./SharedModules";
import { useAuth } from "@/context/AuthContext";

export default function Modules() {
  const { user } = useAuth();

  if (user?.type === "ORGANIZATION") {
    return <ViewModules />;
  }

  return <SharedModules />;
}
