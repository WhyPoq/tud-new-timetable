import { useState, useEffect, useRef, useCallback } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

import constants from "../constants";

const Search = ({ selectedProgram, setSelectedProgram }) => {
	const searchAbortController = useRef(new AbortController());

	// Cleanup function to abort fetch on component unmount
	useEffect(() => {
		return () => {
			searchAbortController.current.abort();
		};
	}, []);

	async function searchPrograms(query) {
		query = query.replaceAll("&", "");

		let requestUrl = `https://${constants.database_name}.azurewebsites.net/api/Public/CategoryTypes/241e4d36-93f2-4938-9e15-d4536fe3b2eb/Categories/FilterWithCache/50a55ae1-1c87-4dea-bb73-c9e67941e1fd?pageNumber=1&query=`;
		requestUrl += query;

		searchAbortController.current.abort();
		searchAbortController.current = new AbortController();
		const signal = searchAbortController.current.signal;
		fetch(requestUrl, { method: "POST", signal })
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Network response was NOT ok");
				}
			})
			.then((json) => {
				json.Results = json.Results.map((el) => {
					const { Name, CategoryTypeIdentity, Identity } = el;
					return { Name, CategoryTypeIdentity, Identity };
				});

				setSearchedPrograms(json.Results);
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					console.error("Error while fetching programs:", error);
				}
			});
	}

	function selectProgram(ind) {
		if (searchedPrograms[ind]) {
			setSelectedProgram(searchedPrograms[ind]);
			document.getElementById("search-input").value = searchedPrograms[ind].Name;
			document.getElementById("search-input").blur();
			document.getElementById("search").classList.remove("selected");
			searchPrograms(searchedPrograms[ind].Name);
		}
	}

	function openSearch() {
		let input = document.getElementById("search-input");
		searchPrograms(input.value);
		document.getElementById("search").classList.add("selected");
	}

	const [searchedPrograms, setSearchedPrograms] = useState([]);

	const closeSearch = useCallback(() => {
		document.getElementById("search").classList.remove("selected");
		document.getElementById("search-input").value = selectedProgram ? selectedProgram.Name : "";
	}, [selectedProgram]);

	//handle click outside of the search
	const dropdownRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				closeSearch();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef, selectedProgram, closeSearch]);

	return (
		<div
			className="search"
			id="search"
			ref={dropdownRef}
			onFocus={() => {
				openSearch();
			}}
		>
			<SearchBar
				search={searchPrograms}
				selectProgram={selectProgram}
				handleTabOut={closeSearch}
			/>
			<SearchResults results={searchedPrograms} selectProgram={selectProgram} />
		</div>
	);
};

export default Search;
