import logo from "../assets/logo.svg"
import Search from "./Search";

const Header = ({ selectedProgram, setSelectedProgram }) => {
    return (
        <header>
            <div className="header-wrapper">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <Search 
                    selectedProgram={ selectedProgram }
                    setSelectedProgram={ setSelectedProgram }
                />
            </div>
        </header>
    );
}
 
export default Header;