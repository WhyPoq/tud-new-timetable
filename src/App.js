import { Routes, Route } from 'react-router-dom';
import TimetablePage from './components/TimetablePage';
import About from './components/About';

function App() {
	return (
		<Routes>
			<Route path="/" element={<TimetablePage />} />
			<Route path="/about" element={<About />} />
		</Routes>
	);
}

export default App;
