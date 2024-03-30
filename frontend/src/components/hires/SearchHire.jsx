import { Search } from 'lucide-react';
import PropTypes from 'prop-types'
import { useState } from 'react';


const SearchHire = ({onSearch}) => {

  SearchHire.propTypes = {
        onSearch: PropTypes.func.isRequired,
      };


  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

  return (
    <div className="">
    <form className="border-[1px] border-black rounded-md flex justify-between px-5 py-2" onSubmit={handleSubmit}>
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
    </form>
    </div>
    
  );
};

export default SearchHire;
