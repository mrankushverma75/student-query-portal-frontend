"use client";

import { updateQuery } from "@/features/queries/queryService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface QueryRow {
  id: string;
  status: string;
  [key: string]: string | number;
}

interface DataListProps {
  header: string[];
  data: QueryRow[];
  isActionBtn: boolean;
}

const DataList: React.FC<DataListProps> = ({ header, data, isActionBtn }) => {
  const mutation = useMutation({
    mutationFn: (data: { url: string; formData: FormData }) =>
      updateQuery(data.url, data.formData),
    onSuccess: () => toast.success("Query updated successfully!"),
    onError: () => toast.error("Failed to update query."),
  });

  const [inputs, setInputs] = useState({ resolverNote: "", internalNote: "" });

  const handleChange = (value: string, id: string) => {
    const formData = new FormData();
    formData.append("status", value);
    mutation.mutate({ url: `/api/queries/${id}`, formData });
  };

  const handleInputs = (e: any) => {
    const { name, value } = e.target;
    let key =
      name === "resolver_note"
        ? "resolverNote"
        : name === "internal_note"
        ? "internalNote"
        : "";

    setInputs({ ...inputs, [key]: value });
  };

  const handleSubmit = (id: string) => {
    const formData = new FormData();
    (Object.keys(inputs) as (keyof typeof inputs)[]).forEach((input) => {
      formData.append(input, inputs[input]);
    });
    
    mutation.mutate({ url: `/api/queries/${id}`, formData });
  };
  
  return (
    <div className="border rounded">
      <table className="table-auto w-full">
        <thead>
          <tr className="min-h-12">
            {header.map((heading, index) => (
              <th key={index} className="border p-2">
                {heading}
              </th>
            ))}
            {isActionBtn && <th className="border p-2">Action</th>}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {header.map((heading, colIndex) => {
                  const isEditableField =
                    row.status !== "Resolved" &&
                    isActionBtn &&
                    ((heading === "Resolver Note" && !row.resolverNote) ||
                      (heading === "Internal Note" && !row.internalNote));
                  const resolvedKey =
                    heading.toLowerCase() === "resolver note"
                      ? "resolverNote"
                      : heading.toLowerCase() === "internal note"
                      ? "internalNote"
                      : heading.toLowerCase();

                  return (
                    <td
                      key={colIndex}
                      className={`border p-2 text-center ${
                        row.status === "Resolved" ? "bg-green-50" : ""
                      }`}
                    >
                      {isEditableField ? (
                        <Input
                          onChange={handleInputs}
                          placeholder={`Type ${heading}`}
                          type="text"
                          name={heading.replace(" ", "_").toLowerCase()}
                        />
                      ) : (
                        (row[resolvedKey] as string) || "N/A"
                      )}
                    </td>
                  );
                })}
                {isActionBtn && (
                  <td
                    className={`border p-2 ${
                      (inputs.resolverNote || inputs.internalNote) &&
                      "gap-x-2 flex"
                    } ${row.status === "Resolved" ? "bg-green-50" : ""}`}
                  >
                    <select
                      className={`outline-0 w-full h-full ${
                        row.status === "Resolved" ? "bg-green-50" : ""
                      }`}
                      defaultValue={row.status}
                      disabled={row.status === "Resolved"}
                      onChange={(e) => handleChange(e.target.value, row.id)}
                    >
                      {["Pending", "In-Progress", "Resolved"].map(
                        (status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                    {(inputs.resolverNote || inputs.internalNote) && (
                      <Button
                        name="Save"
                        onClick={() => handleSubmit(row.id)}
                        disabled={false}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isActionBtn ? header.length + 1 : header.length}
                className="border p-2 text-center"
              >
                No queries available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
