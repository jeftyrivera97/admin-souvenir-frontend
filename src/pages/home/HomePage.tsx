import {
  IndexAdminHomePageComponent,
  IndexHomePageComponent,
} from "@/components";
import { useAuth } from "@/store/auth";

export const HomePage = () => {
  const user = useAuth((s) => s.user);
  const role = user?.role || "2";

  console.log("User Role:", role);

  const isPrivileged = role === "1" || role === "3";

  return (
    <div>
      {!isPrivileged ? (
        <IndexHomePageComponent />
      ) : (
        <IndexAdminHomePageComponent />
      )}
    </div>
  );
};
