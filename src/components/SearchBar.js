import { useRef } from "react";
import { SearchIcon } from "./icons/SearchIcon";

const iconSize = 22;

const SearchBar = ({ search, selectProgram, handleTabOut }) => {
	const inputRef = useRef(null);

	const handleEnterKey = (event) => {
		if (event.key === "Enter") {
			selectProgram(0);
		} else if (event.key === "Tab") {
			handleTabOut();
		}
	};

	const handleSearchIconClick = () => {
		inputRef.current?.focus();
	};

	return (
		<div className="search-bar">
			<input
				ref={inputRef}
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
			<button onClick={handleSearchIconClick} className="search-icon-button">
				<SearchIcon alt="Search" width={iconSize} height={iconSize} />
			</button>
		</div>
	);
};

export default SearchBar;
