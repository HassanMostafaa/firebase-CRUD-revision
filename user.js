<div key={ix}>
  <p>User Name : {user.name}</p>
  <p>User Age : {user.age}</p>

  <button onClick={() => updateUser(user.id, user.age)}>
    Increament Age by 1
  </button>
  <button onClick={() => deleteUser(user.id)}>Delete User</button>
  <button onClick={() => toggleEditMode(user.name, user.id, user.editMode)}>
    Edit Name
  </button>
  {/* <button onClick={() => setEditMode(true)}> Edit Name</button> */}
  <div>
    {user.editMode ? (
      <>
        <input
          type="text"
          placeholder="Enter The New Name..."
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <button onClick={() => enterNewName(user.id)}>
          Submit The New Name
        </button>
      </>
    ) : (
      ""
    )}
  </div>

  <hr />
</div>;
