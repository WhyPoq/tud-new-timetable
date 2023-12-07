import searchIcon from "../assets/searchIcon.svg"

const SearchBar = ({ search, selectProgram, handleTabOut }) => {

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            selectProgram(0);
        }
        else if(event.key === 'Tab'){
            handleTabOut();
        }
    };

    return (
        <div 
            className="search-bar" 
        > 
            <input 
                type="search" 
                placeholder="Select program" 
                name="Select program search bar"
                className="selected-program"
                id="search-input"
                tabIndex="0"
                autoComplete="off"

                onChange={(e) => search(e.target.value)}
                onKeyDown={handleEnterKey}
            />
            <div>
                <img src={searchIcon} alt="Search" />
            </div>
        </div>
    );
}
 
export default SearchBar;