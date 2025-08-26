import { LogoIcon } from "./icons/LogoIcon";
import Search from "./Search";
import { ThemeToggle } from "./ThemeToggle";

const Header = ({ selectedProgram, setSelectedProgram }) => {
	return (
		<header>
			<div className="header-wrapper">
				<div className="left-header">
					<div className="logo">
						<LogoIcon alt="Logo" />
					</div>
					<Search
						selectedProgram={selectedProgram}
						setSelectedProgram={setSelectedProgram}
					/>
				</div>
				<ThemeToggle />
			</div>
		</header>
	);
};

export default Header;
