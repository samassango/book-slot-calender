import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{ backgroundImage: `url(/images/background.png)` }}>
      <div className="w-full max-w-sm">
    {/* // <AuthLayout> */}
      <LoginForm />
    {/* // </AuthLayout> */}
      </div>
    </div>
  );
}
