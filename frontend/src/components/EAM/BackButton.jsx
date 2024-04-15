import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = '/emergency'}) => {
    return(
        <div className="flex items-center">
            <Link to={destination} className="flex items-center ">
                <BsArrowLeft className="text-blue-500 hover:text-blue-700" />
               
            </Link>
        </div>
    )
}

export default BackButton;