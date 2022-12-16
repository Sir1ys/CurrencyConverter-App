import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="block block-footer">
        <a href={"https://www.instagram.com/oleksandr.lw/"}>
          <InstagramIcon className="icon" />
          <span>Instagram</span>
        </a>
        <a href="https://github.com/Sir1ys">
          <GitHubIcon className="icon" />
          <span>Github</span>
        </a>
        <a href="https://www.linkedin.com/in/oleksandr-korovii-7b293a229/">
          <LinkedInIcon className="icon" />
          <span>LinkedIn</span>
        </a>
      </div>
      <div className="block block-name">
        Created by <span className="name">Oleksandr Korovii</span>
      </div>
    </footer>
  );
}
