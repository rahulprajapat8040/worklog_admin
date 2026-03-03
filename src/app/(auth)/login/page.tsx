import Card from "@/components/ui/card/Card";
import LoginForm from "@/features/auth/LoginForm";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full h-dvh flex flex-col gap-8 items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-2">
            <ClipboardList className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">WorkLog Pro</h1>
          <p className="text-sm text-muted-foreground">
            Office Task & Monthly Report System
          </p>
        </div>
        <Card className="flex flex-col items-center mt-6">
          <LoginForm />
          <Link
            href={"/"}
            className="text-sm text-primary my-4 hover:underline underline-offset-2"
          >
            Forget your password?
          </Link>
        </Card>
      </div>
    </div>
  );
};
export default Login;
