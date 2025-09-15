import { LoginForm } from "../components/LoginForm";
import { ThemeProvider } from "@/components/theme";
import { Store } from "lucide-react"

export const LoginPage = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Store className="size-4" />
          </div>
          El Buen Amigo Souvenir
        </a>
          <LoginForm />
        </div>
      </div>
    </ThemeProvider>
  );
};
