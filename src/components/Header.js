import logo from "../assets/logo.svg"
import Search from "./Search";

const Header = ({ selectedProgram, setSelectedProgram }) => {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <Search 
                selectedProgram={ selectedProgram }
                setSelectedProgram={ setSelectedProgram }
            />
        </header>
    );
}
 
export default Header;