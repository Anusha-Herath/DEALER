import React, { useState } from "react";
import { SidebarData } from "../../data/dealer/dashboard";

function SideBar() {
  const [activeLink, setActiveLink] = useState(null); // Track the currently active link

  const handleLinkClick = (index) => {
    setActiveLink((prev) => (prev === index ? null : index)); // Toggle the active link
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarExpanded(true); // Expand the sidebar on mouse enter
  };

  const handleMouseLeave = () => {
    setIsSidebarExpanded(false); // Collapse the sidebar on mouse leave
  };

  return (
    <div
      className={`flex flex-col h-auto mt-30 text-white bg-gradient-to-r from-secondary to-primary transition-all duration-300 ${
        isSidebarExpanded ? "w-64 p-4 rounded-2xl" : "w-16 rounded-lg"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* profile card */}
      <div
        className={`flex items-center space-x-5 mb-4 bg-gradient-to-r from-secondary to-success rounded-lg p-2 shadow-2xl ${
          isSidebarExpanded ? "flex-row" : "flex-col items-center"
        }`}
      >
        <img
          src="https://www.slt.lk/sites/default/files/images/products%20related/internet_lp_bottom_slt_4G_large.jpg"
          alt="Logo"
          className="w-12 h-12 rounded-full"
        />
        {isSidebarExpanded && (
          <div className="block">
            <h1 className="font-bold text-md">D.Perera</h1>
            <p className="text-sm">H23311-2</p>
            <p className="text-[12px]">Level-2</p>
          </div>
        )}
      </div>

      {/* navigations */}
      <ul className="px-3 py-5 space-y-5">
        {SidebarData.map((item, index) => {
          const isActive = activeLink === index; // Check if the current link is active
          return (
            <li key={index}>
              {/* main routes */}
              <div
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                  isActive
                    ? "bg-success"
                    : "hover:border-l-8 hover:border-l-success"
                }`}
                onClick={() => handleLinkClick(index)} // Set the active link on click
              >
                {/* Render icon as an image if it's a string, otherwise render as a component */}
                {typeof item.icon === "string" ? (
                  <img src={item.icon} alt={item.title} className="w-6 h-6" />
                ) : (
                  <item.icon className="w-6 h-6" />
                )}
                {isSidebarExpanded && (
                  <a href={item.href} className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                  </a>
                )}
              </div>
              {/* sub-routes */}
              {item.sublinks && item.sublinks.length > 0 && (
                <ul
                  className={`${isActive ? "block" : "hidden"} pl-4 space-y-2`} // Show sublinks only if the link is active
                >
                  {item.sublinks.map((link) => (
                    <a href={link.href} key={link.title}>
                      <li
                        className={`px-2 hover:bg-gradient-to-r from-secondary to-success rounded-md ${
                          isSidebarExpanded ? "text-sm" : "hidden"
                        }`}
                      >
                        {link.title}
                      </li>
                    </a>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
