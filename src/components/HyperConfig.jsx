import { useEffect } from "react";

export default function initHyperConfig() {

  useEffect(() => {
    
    const defaultConfig = {
      theme: "light",
      nav: "vertical",
      layout: { mode: "fluid", position: "fixed" },
      topbar: { color: "light" },
      menu: { color: "dark" },
      sidenav: { size: "default", user: false },
    };

    const html = document.documentElement; // <html> element
    let config = { ...defaultConfig };

    // Load from session storage if exists
    const storedConfig = sessionStorage.getItem("__HYPER_CONFIG__");
    if (storedConfig) {
      try {
        config = JSON.parse(storedConfig);
      } catch {
        console.warn("Invalid config in sessionStorage");
      }
    }

    // Override from HTML data attributes (if set)
    const setFromAttr = (attr, targetPath) => {
      const val = html.getAttribute(attr);
      if (val !== null) {
        let ref = config;
        const parts = targetPath.split(".");
        for (let i = 0; i < parts.length - 1; i++) {
          ref = ref[parts[i]];
        }
        ref[parts[parts.length - 1]] = val;
      }
    };

    setFromAttr("data-bs-theme", "theme");
    setFromAttr("data-layout", "nav");
    setFromAttr("data-layout-mode", "layout.mode");
    setFromAttr("data-layout-position", "layout.position");
    setFromAttr("data-topbar-color", "topbar.color");
    setFromAttr("data-sidenav-size", "sidenav.size");
    setFromAttr("data-sidenav-user", "sidenav.user");
    setFromAttr("data-menu-color", "menu.color");

    // Apply nav type
    config.nav =
      html.getAttribute("data-layout") === "topnav" ? "horizontal" : "vertical";

    // Apply to HTML element
    html.setAttribute("data-bs-theme", config.theme);
    html.setAttribute("data-layout-mode", config.layout.mode);
    html.setAttribute("data-menu-color", config.menu.color);
    html.setAttribute("data-topbar-color", config.topbar.color);
    html.setAttribute("data-layout-position", config.layout.position);

    if (config.nav === "vertical") {
      let sidenavSize = config.sidenav.size;
      if (window.innerWidth <= 767) {
        sidenavSize = "full";
      } else if (
        window.innerWidth <= 1140 &&
        sidenavSize !== "full" &&
        sidenavSize !== "fullscreen"
      ) {
        sidenavSize = "condensed";
      }
      html.setAttribute("data-sidenav-size", sidenavSize);

      if (config.sidenav.user === true || config.sidenav.user === "true") {
        html.setAttribute("data-sidenav-user", "true");
      } else {
        html.removeAttribute("data-sidenav-user");
      }
    }

    // Save back to sessionStorage
    sessionStorage.setItem("__HYPER_CONFIG__", JSON.stringify(config));

    // Make config globally accessible if needed
    window.config = config;
    window.defaultConfig = { ...defaultConfig };
  }, []);
}
