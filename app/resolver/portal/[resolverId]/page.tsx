"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataList from "@/components/DataList";
import { useQuery } from "@tanstack/react-query";
import { fetchQueries } from "@/features/queries/queryService";

const Page = () => {
  const handleSubmit = () => {
    toast.success("Query submitted!");
  };

  const dataTableHeadings = [
    "Title",
    "Description",
    "Status",
    "Resolver Note",
    "Internal Note",
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["queries", "/api/queries?status=open"],
    queryFn: fetchQueries,
  });

  return (
    <div className="w-full p-2">
      <div className="container mx-auto py-10">
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
              data={data}
              isActionBtn={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
