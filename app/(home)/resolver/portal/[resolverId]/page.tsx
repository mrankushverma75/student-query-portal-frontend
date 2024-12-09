"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataList from "@/components/DataList";
import { useQuery } from "@tanstack/react-query";
import { fetchQueries } from "@/features/queries/queryService";
import { useUser } from "@/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";

const Page = () => {
  const handleSubmit = () => {
    toast.success("Query submitted!");
  };

  const { resolverId } = useParams();
  const router = useRouter();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser();

  useEffect(() => {
    if (!user || user.id !== resolverId) {
      router.push("/login");
    }
  }, [isUserError, router]);

  const dataTableHeadings = [
    "Title",
    "Description",
    "Status",
    "Resolver Note",
    "Internal Note",
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["queries", "/api/queries/assigned"],
    queryFn: fetchQueries,
  });

  const logout = useLogout();

  return (
    <div className="w-full p-2">
      <div className="container mx-auto py-10">
        <div className="text-right">
          <span className="me-3">{user?.email}</span>
          <button
            onClick={logout}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Queries for Action
        </h1>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Queries</h3>
          {isLoading ? (
            <p className="text-center">Loading Queries...</p>
          ) : error ? (
            <p className="text-center">Failed to fetch queries.</p>
          ) : (
            <DataList
              header={dataTableHeadings}
              data={data.result}
              isActionBtn={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
