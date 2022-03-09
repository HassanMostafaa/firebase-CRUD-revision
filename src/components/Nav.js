import React from "react";

export const Nav = () => {
  return (
    <div className="nav ">
      <div className="logo hideOnSmall">
        {" "}
        <img
          src="https://logodix.com/logo/2028989.png"
          height="60px"
          alt=""
          style={{ marginBottom: "-10px", marginRight: "5px" }}
        />
        <img
          src="https://www.gstatic.com/devrel-devsite/prod/vea32910d5631902da7876bf3132bf2a23b4c6e7b82b4223c953da55851058027/firebase/images/lockup.svg"
          height="60px"
          alt=""
          style={{ marginBottom: "-10px", marginRight: "5px" }}
        />
      </div>
      <div className="nav-menu">
        <a href="#">Link</a>
        <a href="#">Link</a>
      </div>
    </div>
  );
};
