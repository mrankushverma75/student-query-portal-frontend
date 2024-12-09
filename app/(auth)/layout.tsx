"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  const router = useRouter();
  const { data: user } = useUser();

  useEffect(() => {
    if (!user) return;

    if (user.role === "Resolver") {
      router.push(`/resolver/portal/${user.id}`);
    } else if (user.role === "Student") {
      router.push(`/student/portal/${user.id}`);
    }
  }, [user, router]);

  return <div>{children}</div>;
}
