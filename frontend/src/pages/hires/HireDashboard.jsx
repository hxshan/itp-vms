import HireList from "@/components/hires/HireList"
import HireForm from "@/components/hires/HireForm"
import { useState } from "react"

const HireDashboard = () => {

    //const columns =["Name","Email","IDK foreal","something","Actions"]
    //const data =[{id:"1s56d1saads",name:"heshan",email:"idk",some:"dadfsa",some2:"sdad"},{}]

    const [showForm , setShowForm] = useState(false)

    return (
        <div className="container">
            {showForm ? (
            <HireForm showForm={showForm} setShowForm={setShowForm} />) : (
            <HireList showForm={showForm} setShowForm={setShowForm} />)}
        </div>
    )
}

export default HireDashboard
