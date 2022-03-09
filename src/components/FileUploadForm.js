import React from "react";

export const FileUploadForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file);
  };
  return (
    <div>
      <h3>Upload Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
