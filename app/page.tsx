"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/student/portal/123");
    }
  }, [isUserError, router]);

  return <div></div>;
}
