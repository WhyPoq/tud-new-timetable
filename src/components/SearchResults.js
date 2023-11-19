const SearchResults = ({ results, selectProgram}) => {
    return ( 
        <div 
            className="search-results"
            tabIndex="-1"
        >
            <div className="search-results-wrapper">
                { results.map((result, ind) => {
                    return (
                        <button 
                            key={ ind }
                            onClick={ () => selectProgram(ind) }
                            className="search-result-button"
                            tabIndex="0"
                        >
                            { result.Name }
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
 
export default SearchResults;