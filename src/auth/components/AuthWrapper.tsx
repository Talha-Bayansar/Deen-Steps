"use client";

import { routes } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "../hooks/useSession";

type Props = {
  children: JSX.Element;
};

export const AuthWrapper = ({ children }: Props) => {
  const { isLoading } = useSession();

  if (isLoading) return <AuthLoading />;
  return <AuthRequired>{children}</AuthRequired>;
};

const AuthLoading = () => {
  return (
    <div className="flex-grow grid place-items-center">
      <div className="p-6 flex flex-col items-center space-y-4 w-full max-w-md">
        <div className="flex flex-col items-center space-y-2">
          <h3 className="font-semibold text-lg">Authenticating</h3>
          <p className="text-sm text-gray-500">
            Please wait while we verify your credentials
          </p>
        </div>

        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

const AuthRequired = ({ children }: Props) => {
  const router = useRouter();
  const { data } = useSession();

  if (!data?.user) {
    router.push(routes.signin.root);
    return null;
  }

  return children;
};
