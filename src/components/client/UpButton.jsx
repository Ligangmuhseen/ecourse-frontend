import React, { useEffect, useState } from "react";

const UpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Back to Top */}
      {showButton && (
        <a
          href="#"
          onClick={scrollToTop}
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
          style={{ zIndex: "99999", display: showButton ? "block" : "none" }}
        >
          <i className="fa fa-angle-double-up"></i>
        </a>
      )}
    </>
  );
};

export default UpButton;