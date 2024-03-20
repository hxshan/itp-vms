
const EmployeeTable = ({data,isLoading }) => {
const columns=["Name","Email","Role","Status"]
  if(isLoading){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <h2 className="font-bold text-xl underline mb-4">User List</h2>
        <div className="flex gap-4 w-fit">
          <button className="w-[130px] bg-blue-600 p-1 px-1 rounded-lg shadow-md text-sm text-white font-bold">Add user</button>
          <input type="text" name="Search" 
          placeholder="Search"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-500">
          <tr>
            {columns.map((col,index) => {
              return <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider" key={index}>{col}</th>
            })}
            <th className="relative px-6 py-3">
              <span className="text-center text-xs font-bold text-white uppercase tracking-wider">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {(data!=null && data.length>0)  ?(data.map((row) => {

            return (
                <tr className="bg-white" key={row._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.role.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {row.status?'Inactive':row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap justify-between flex">
                    <button className="bg-blue-600 text-white py-1 px-4 rounded-md">View</button>
                    <button className="bg-yellow-300 text-white py-1 px-4 rounded-md">Edit</button>
                    <button className="bg-red-700 text-white py-1 px-4 rounded-md">Delete</button>
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
      
    </div>

  );
};

export default EmployeeTable;
