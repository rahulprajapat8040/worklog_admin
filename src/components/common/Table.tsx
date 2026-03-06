import { TableProps } from "@/lib/interfaces/common/table.interface";

const Table = <T extends Record<string, any>>({
  columns,
  data,
  className = "",
  tableClassName = "",
  minHeight = "min-h-96",
  emptyMessage = "No data available",
  loading = false,
}: TableProps<T>) => {
  return (
    <div
      className={` flex flex-col w-full border border-border rounded-md justify-between bg-white ${minHeight} ${className}`}
    >
      <div className={`w-full ${tableClassName} overflow-x-auto scrollbar`}>
        <table className="min-w-max w-full whitespace-nowrap border-separate rounded-lg">
          <thead>
            <tr className="text-muted-foreground font-semibold *:py-3 *:px-5 rounded-lg">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left font-medium ${
                    column.headerClassName || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  <div className="flex flex-col justify-center items-center">
                    <span className="mt-2 text-gray-500">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                return (
                  <tr
                    key={`${index}`}
                    className="*:px-5 *:border-y  *:border-[#DBDBDB59]"
                  >
                    {columns.map((column, idx) => (
                      <td
                        key={`${idx}-${column.key}`}
                        className={`py-3.5 px-5 text-muted-foreground ${
                          column.className || ""
                        } `}
                      >
                        {column.render
                          ? column.render(item, index)
                          : item[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
