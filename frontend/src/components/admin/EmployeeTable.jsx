
const EmployeeTable = ({data,isLoading }) => {
const columns=["Name","Email","Role","Status"]
  if(isLoading){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col,index) => {
              return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={index}>{col}</th>
            })}
            <th className="relative px-6 py-3">
             <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data!=null && data.length>0  ?(data.map((row) => {
            return (
                <tr key={row._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.role.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {row.status?'Inactive':row.status}
                    </span>
                  </td>
                  <td>
                    <button className="bg-blue-600 text-white">View</button>
                    <button className="bg-yellow-300 text-white">Edit</button>
                    <button className="bg-red-700 text-white">Delete</button>
                  </td>
              </tr>
            );
          })):(
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
