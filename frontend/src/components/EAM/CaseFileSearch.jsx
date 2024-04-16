import React from "react";
import PropTypes from "prop-types";

const CaseFileSearch = ({ searchTerm, handleSearch, filterField, handleFilterChange }) => {

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex">
                <select
                    value={filterField}
                    onChange={handleFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
                    >
                             <option value="">Filter by...</option>
                             <option value="caseTitle">Case Title</option>
                             <option value="location">Location</option>
                             <option value="timeOfIncident">Time of Incident</option>
                             <option value="passengerCount">Passenger Count</option>
                             <option value="severity">Severity</option>
                             <option value="status">Status</option>


                    </select>
                <input
                    type="text"
                    placeholder="Search case files"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearch}
                />
        </div>
        </div>
    );
};

CaseFileSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    filterField: PropTypes.string.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
  };

export default CaseFileSearch;