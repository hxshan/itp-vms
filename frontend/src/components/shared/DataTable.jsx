
const DataTable = ({columns,data}) => {

  return (
    <div>
        <table>
            <thead>
                <tr>
                    {
                        columns.map((col)=>{
                            return (<th key={col}>col</th>)
                        })
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        data.map((row,index)=>{
                            return(
                                <tr key={index}>
                                    {
                                    row.map((item)=>{
                                        return(
                                            <td key={item.id}>
                                                item
                                            </td>
                                        )
                                    })
                                    }
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    </div>
  )
}

export default DataTable