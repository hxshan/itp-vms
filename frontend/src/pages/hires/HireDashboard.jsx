import HireList from "@/components/hires/HireList"
import HireForm from "@/components/hires/HireForm"

const HireDashboard = () => {
    //const columns =["Name","Email","IDK foreal","something","Actions"]
    //const data =[{id:"1s56d1saads",name:"heshan",email:"idk",some:"dadfsa",some2:"sdad"},{}]

  return (
    <div className="container mx-auto">
        <HireList />
        <HireForm />
     </div>
  )
}

export default HireDashboard