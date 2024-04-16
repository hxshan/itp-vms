import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import PropTypes from 'prop-types';

const BackButton = ({ destination = '/emergency'}) => {
    return(
        <div className="flex items-center">
            <Link to={destination} className="flex items-center ">
                <BsArrowLeft className="text-blue-500 hover:text-blue-700" />
               
            </Link>
        </div>
    )
};

BackButton.propTypes = {
    destination: PropTypes.string.isRequired,
  };
  
  BackButton.defaultProps = {
    destination: '/emergency',
  };

export default BackButton;