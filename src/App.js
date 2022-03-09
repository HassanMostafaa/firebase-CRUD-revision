import "./App.css";

import React from "react";
import { Nav } from "./components/Nav";
import { Users } from "./components/Users";
// import { FileUploadForm } from "./components/FileUploadForm";

function App() {
  return (
    <div className="App">
      <Nav />

      <Users />

      {/* <FileUploadForm /> */}
    </div>
  );
}

export default App;
