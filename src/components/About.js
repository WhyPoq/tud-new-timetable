import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { LogoIcon } from "./icons/LogoIcon";

const About = () => {
	const feedbackFormLink =
		"https://docs.google.com/forms/d/e/1FAIpQLSdLiVd4DzUO2b4Unq-axHIdNO6PcGSd1xKC2U3YCienscIfqg/viewform?usp=sf_link";

	return (
		<div className="about-page">
			<div className="inner-body">
				<header>
					<div className="header-wrapper">
						<div className="left-header">
							<Link to="/" className="logo">
								<LogoIcon alt="Logo" />
							</Link>
							<h2>About</h2>
						</div>
						<ThemeToggle />
					</div>
				</header>

				<main>
					<div className="about-text-container">
						<p>
							I am a TUD student and I decided to build my version of the timetable
							website. Cause, beeing honest, the official one is awful.
						</p>

						<p>
							Now after you pick your timetable, your choice is saved. And timetable
							properly updates every time you visit it.
						</p>

						<p>
							Site is now hosted on github pages, so it can't handle much traffic. If
							there will be some demand for this site, I can host it properly.
						</p>

						<p>
							There may be some mistakes and bugs on some devices or for some
							programs. If there is an error, you can submit it in a feedback form (
							<Link to={feedbackFormLink} target="_blank">
								form link
							</Link>
							) But I am not promising to fix it.
						</p>

						<p>Design is highly influenced by ITMO University timetable.</p>

						<p>Made by Konstantin Skliar</p>
					</div>
				</main>
			</div>
		</div>
	);
};

export default About;
