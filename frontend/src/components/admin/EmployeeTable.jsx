
const EmployeeTable = ({data,isLoading }) => {
const columns=["Name","Email","Role","Status","Action"]
  if(isLoading){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <div>
      <table className="border-black border-bl">
        <thead>
          <tr>
            {columns.map((col,index) => {
              return <th key={index}>{col}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data!=null && data.length>0  ?(data.map((row) => {
            return (
                <tr key={row._id}>
                  <td>{row.firstName}</td>
                  <td>{row.email}</td>
                  <td>{row.role.name}</td>
                  <td>{row.status}</td>
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
