import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = '/'}) => {
    return(
        <div className="flex">
            <Link to={destination} className="flex items-center text-blue-500 hover:text-blue-700">
                <BsArrowLeft className="mr-2" />
                Back
            </Link>
        </div>
    )
}

export default BackButton;