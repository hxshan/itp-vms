const EmployeeTable = ({ columns, data,isLoading }) => {

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
          {data.map((row) => {
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
