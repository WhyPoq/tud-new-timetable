import searchIcon from "../assets/searchIcon.svg"

const SearchBar = ({ search }) => {

    return (
        <div 
            className="search-bar" 
            tabIndex="-1"
        > 
            <input 
                type="search" 
                placeholder="Select program" 
                name="Select program search bar"
                className="selected-program"
                id="search-input"

                onChange={(e) => search(e.target.value)}
            />
            <div>
                <img src={searchIcon} alt="Search" />
            </div>
        </div>
    );
}
 
export default SearchBar;