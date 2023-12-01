import { Link } from "react-router-dom";

const Footer = () => {
    const feedbackFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSdLiVd4DzUO2b4Unq-axHIdNO6PcGSd1xKC2U3YCienscIfqg/viewform?usp=sf_link";
    return (
        <footer>
            <Link to="/about">About</Link>
            <Link to={ feedbackFormLink } target="_blank">Feedback</Link>
        </footer>
    );
}
 
export default Footer;