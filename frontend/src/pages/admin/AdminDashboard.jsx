import DataTable from "../../components/shared/DataTable"

const AdminDashboard = () => {

    const columns =["Name","Email","IDK foreal","something","Actions"]
    const columns =[{id:"",na}]
  return (
    <div className="container mx-auto py-10">
        <DataTable columns={columns}/>
     </div>
  )
}

export default AdminDashboard