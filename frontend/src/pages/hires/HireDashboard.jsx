import HireTable from "@/components/hires/HireTable"

const HireDashboard = () => {
    const columns =["Name","Email","IDK foreal","something","Actions"]
    const data =[{id:"1s56d1saads",name:"heshan",email:"idk",some:"dadfsa",some2:"sdad"},{}]

  return (
    <div className="container mx-auto py-10">
        <HireTable columns={columns} data={data}/>
     </div>
  )
}

export default HireDashboard