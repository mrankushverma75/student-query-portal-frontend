"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DataList from "@/components/DataList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchQueries, submitQuery } from "@/features/queries/queryService";
import { useUser } from "@/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

interface InputFields {
  title: string | null;
  description: string | null;
  file: File | null;
}

const Page = () => {
  const router = useRouter();
  const { studentId } = useParams();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser();

  useEffect(() => {
    if (!user || user.id !== studentId) {
      router.push("/login");
    }
  }, [isUserError, router]);

  const mutation = useMutation({
    mutationFn: (data: { url: string; formData: FormData }) =>
      submitQuery(data.url, data.formData),
    onSuccess: () => toast.success("Query submitted successfully!"),
    onError: () => toast.error("Failed to submit query."),
  });

  const [input, setInput] = useState<InputFields>({
    title: "",
    description: "",
    file: null,
  });

  const handleSubmit = () => {
    if (!input.title || !input.description) {
      toast.error("Please fill out all fields!");
      return;
    }

    const form = new FormData();
    form.append("title", input.title);
    form.append("description", input.description);

    if (input.file) form.append("file", input.file);

    mutation.mutate({ url: "/api/queries", formData: form });
  };

  const inputs = [
    {
      name: "title",
      type: "text",
      placeholder: "Enter Title",
    },
    {
      name: "description",
      type: "text",
      placeholder: "Enter Description",
    },
    {
      name: "file",
      type: "file",
      placeholder: null,
    },
  ];

  const dataTableHeadings = ["Title", "Description", "Status", "Resolver Note"];

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: name === "file" ? files?.[0] || null : value,
    }));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["queries", "/api/queries"],
    queryFn: fetchQueries,
  });

  const isSubmitLoading = mutation.status === "pending";

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

        <h1 className="text-3xl font-bold mb-8 text-center">My Queries</h1>

        <h3 className="mb-2 text-lg font-semibold">Create New Query</h3>
        <div className="border rounded p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {inputs.map((elem, key) => (
            <div
              className="col-span-3 lg:col-span-1 w-full flex justify-center"
              key={key}
            >
              <Input
                // value={elem.type === "file" ? undefined : input[elem.name as keyof InputFields]}
                onChange={handleInputs}
                placeholder={elem.placeholder || ""}
                type={elem.type}
                name={elem.name}
              />
            </div>
          ))}

          <div className="col-span-3 flex justify-center">
            <Button
              onClick={handleSubmit}
              name={isSubmitLoading ? "Submitting..." : "Submit Query"}
              disabled={isSubmitLoading}
            />
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Existing Queries</h3>
          {isLoading ? (
            <p className="text-center">Loading Queries...</p>
          ) : error ? (
            <p className="text-center">Failed to fetch queries.</p>
          ) : (
            <DataList
              header={dataTableHeadings}
              data={data.result}
              isActionBtn={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
