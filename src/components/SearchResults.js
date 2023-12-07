const SearchResults = ({ results, selectProgram}) => {
    return ( 
        <div 
            className="search-results"
        >
            <div className="search-results-wrapper">
                { results.map((result, ind) => {
                    return (
                        <button 
                            key={ ind }
                            onClick={ () => selectProgram(ind) }
                            className="search-result-button"
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