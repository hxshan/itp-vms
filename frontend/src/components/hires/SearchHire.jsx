import { Search } from 'lucide-react';
import PropTypes from 'prop-types'
import { useState } from 'react';


const SearchHire = ({onSearch}) => {

  SearchHire.propTypes = {
        onSearch: PropTypes.func.isRequired,
      };


  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('vehicleNumber');

  const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, searchCriteria);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleCriteriaChange = (e) => {
      setSearchCriteria(e.target.value);
    }

  return (
    <div className="">
    <form className="flex justify-between shadow appearance-none border rounded"  onSubmit={handleSubmit}>
      <div className=" flex justify-between px-5 py-2 bg-white rounded-md">
        <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className=" focus:outline-none"
          />

          <button type="submit" className="">
              <Search />
          </button>
      </div>

      <select value={searchCriteria} onChange={handleCriteriaChange} className=" focus:outline-none rounded-md">
        <option value="vehicleNumber">Vehicle Number</option>
        <option value="customerMobile">Customer Mobile</option>
      </select>

    </form>
    </div>
    
  );
};

export default SearchHire;
