import { useState, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";


function App() {
	const [isMobile, setIsMobile] = useState(true);

	const mobileBreakpoint = 768;
	// Update the state on window resize
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileBreakpoint);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup the event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);


	const [selectedProgram, setSelectedProgram] = useState(null);

	useEffect(() => {
		const loadedSelectedProgram = localStorage.getItem("selectedProgram");
		if(loadedSelectedProgram){
			try{
				const programParsed = JSON.parse(loadedSelectedProgram);
				setSelectedProgram(programParsed);
				document.getElementById("search-input").value = 
				programParsed ? programParsed.Name : "";
			}
			catch(e){
				console.log("Error while loading selected program from local storage: " + e);
			}
		}
	}, []);

	useEffect(() => {
		if (selectedProgram) {
			localStorage.setItem("selectedProgram", JSON.stringify(selectedProgram));
		}
	}, [selectedProgram]);

	return (
		<>
			<Header
				selectedProgram={selectedProgram}
				setSelectedProgram={setSelectedProgram}
			/>
			<Main
				selectedProgram={selectedProgram}
				isMobile={isMobile}
			/>
			<Footer />
		</>
	);
}

export default App;
