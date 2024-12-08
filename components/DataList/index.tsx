interface DataListProps {
  header: string[];
  data: { [key: string]: string | number }[];
  isActionBtn: boolean;
}

const DataList: React.FC<DataListProps> = ({ header, data, isActionBtn }) => {
  const handleChange = (e) => {

  } 

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
                {header.map((heading, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${
                      row.status === "Resolved" && "bg-green-50"
                    } border p-2 text-center`}
                  >
                    {row[heading.toLowerCase()] || "N/A"}
                  </td>
                ))}

                {isActionBtn && (
                  <td
                    className={`${
                      row.status === "Resolved" && "bg-green-50"
                    } border p-2`}
                  >
                    <select
                      className={`outline-0 w-full h-full ${
                        row.status === "Resolved" && "bg-green-50"
                      }`}
                      value={row.status}
                      disabled={row.status === "Resolved"}
                      onChange={handleChange}
                    >
                      {["Pending", "In-Progress", "Resolved"].map(
                        (status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
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
