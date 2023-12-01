import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <Link to="/about">About</Link>
            <Link to="https://www.google.com/">Google</Link>
        </footer>
    );
}
 
export default Footer;