import React from "react";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";

const Header = ({ mode, setMode }) => {
  return (
    <nav class="navbar">
      <div class="container">
        <span class="navbar-brand fw-bold mb-0 h1">Quran App</span>
        <DarkModeToggle
          mode={mode}
          size="sm"
          inactiveTrackColor="#343440"
          inactiveTrackColorOnHover="#1e293b"
          inactiveTrackColorOnActive="#cbd5e1"
          activeTrackColor="#e3e3e3"
          activeTrackColorOnHover="#f8fafc"
          activeTrackColorOnActive="#0f172a"
          inactiveThumbColor="#1e293b"
          activeThumbColor="#fff"
          onChange={(mode) => {
            localStorage.setItem("mode", mode);
            setMode(mode);
          }}
        />
      </div>
    </nav>
  );
};

export default Header;
