const EmployeeTable = ({ columns, data }) => {
  return (
    <div>
      <table className="border-black border-bl">
        <thead>
          <tr>
            {columns.map((col) => {
              return <th key={col}>col</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                <td key={row.name}>{row.name}</td>
                <td key={row.email}>{row.email}</td>
                <td key={row.some}>{row.some}</td>
                <td key={row.some2}>{row.some2}</td>
                <td key={row.id}>
                  <button className="bg-blue-600">View</button>
                  <button className="bg-yellow-300">Edit</button>
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
