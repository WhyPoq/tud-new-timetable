import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimetablePage from './components/TimetablePage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<TimetablePage />} />
			</Routes>
    	</Router>
	);
}

export default App;
