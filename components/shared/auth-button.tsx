import React from "react";
import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface IAuthButtonProps {
  onClickAuth: VoidFunction
  className?: string;
}

export const AuthButton: React.FC<IAuthButtonProps> = ({ className, onClickAuth }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {session ? (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onClickAuth}
          variant={"outline"}
          className={"flex items-center gap-1"}
        >
          <User size={16} />
          Войти
        </Button>
      )}
    </div>
  );
};
