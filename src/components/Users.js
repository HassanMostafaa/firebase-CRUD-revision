import React, { useState, useEffect } from "react";
import db from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { RiDeleteBin3Line, RiEdit2Line } from "react-icons/ri";
import { GoEyeClosed } from "react-icons/go";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserAge, setNewUserAge] = useState(0);
  const [editedName, setEditedName] = useState("");

  const usersCollectionRef = collection(db, "users");

  //getting the data
  useEffect(async () => {
    await getUsers();
  }, []);

  const getUsers = async () => {
    const database = await getDocs(
      query(usersCollectionRef, orderBy("createdAt", "desc"))
    );
    setUsers(database.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const changeSearchInput = async (e) => {
    const inpVal = e.target.value.toLowerCase().replace(" ", "");
    const database = await getDocs(
      query(usersCollectionRef, orderBy("createdAt", "desc"))
    );
    setUsers(
      database.docs
        .filter((doc) =>
          doc.data().name.toLowerCase().replace(" ", "").includes(inpVal)
        )
        .map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  //Add Data
  const createUser = async () => {
    if (newUserName === "" || newUserAge <= 0) {
      alert("Invalid Inputs");
      setNewUserAge(0);
      setNewUserName("");
    } else {
      setNewUserAge(0);
      setNewUserName("");
      await addDoc(usersCollectionRef, {
        name: newUserName,
        age: Number(newUserAge),
        editMode: false,
        createdAt: Date.now(),
      });
      // setShowNewUserForm(!showNewUserForm);
      await getUsers();
    }
  };

  //update Data
  const toggleEditMode = async (name, id, editMode) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { editMode: !editMode });
    await getUsers();
    window.location.href = `#${name}`;
  };
  const enterNewName = async (id) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { name: editedName, editMode: false });
    setEditedName("");
    await getUsers();
  };
  //   const updateUser = async (id, age) => {
  //     const userDoc = doc(db, "users", id);
  //     const newAge = { age: age + 1 };
  //     await updateDoc(userDoc, newAge);
  //     getUsers();
  //   };

  //Delete Date
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    await getUsers();
  };

  return (
    <div>
      <p>
        These gets fetched from firebase firestore database crated on
        hassan.firebase2251@gmail.com as a revision for manipulating data CRUD
        (CREATE-READ-UPDATE-DELETE) features sorted by the Newest
      </p>

      {showNewUserForm ? (
        <div>
          {" "}
          <button onClick={() => setShowNewUserForm(!showNewUserForm)}>
            <GoEyeClosed />
          </button>{" "}
          Hide
          <h3>Create User Form</h3>
          <input
            type="text"
            placeholder="User Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={newUserAge}
            onChange={(e) => setNewUserAge(e.target.value)}
          />
          <button onClick={createUser}>Add User</button>
        </div>
      ) : (
        <button onClick={() => setShowNewUserForm(!showNewUserForm)}>
          Create New User
        </button>
      )}

      <div className="table-div">
        <input
          type="text"
          placeholder="Seach by User Name"
          className="search-input"
          onInput={(e) => changeSearchInput(e)}
        />
        <p>Number of Users Shown : {users.length}</p>
        <table className="tg">
          <thead>
            <tr>
              <th className="tg-0lax hideOnSmall">Cell ID</th>
              <th className="tg-0lax hideOnSmall">User Id</th>
              <th className="tg-0lax">User Name</th>
              <th className="tg-0lax">User Age</th>
              <th className="tg-0lax">Edit Mode</th>

              <th className="tg-0lax">Toggle Edit Mode</th>
              <th className="tg-0lax">Delete User</th>
            </tr>
          </thead>
          {users.map((user, ix) => (
            <tbody key={ix} id={user.name}>
              <tr>
                <td className="tg-0lax hideOnSmall">{ix + 1}</td>
                <td className="tg-0lax hideOnSmall">{user.id}</td>
                <td className="tg-0lax">{user.name}</td>
                <td className="tg-0lax">{user.age}</td>
                {!user.editMode ? (
                  <td className="tg-0lax">{!user.editMode ? "OFF" : "ON"}</td>
                ) : (
                  <td className="tg-0lax">
                    <input
                      style={{ width: "100%", margin: "5px 0" }}
                      type="text"
                      placeholder="Enter The New Name..."
                      //   value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />

                    <button
                      style={{ width: "100%" }}
                      onClick={() => enterNewName(user.id)}
                    >
                      Submit The New Name
                    </button>
                  </td>
                )}
                <td className="tg-0lax">
                  <button
                    onClick={() =>
                      toggleEditMode(user.name, user.id, user.editMode)
                    }
                  >
                    <RiEdit2Line />
                  </button>
                </td>
                <td className="tg-0lax">
                  <button onClick={() => deleteUser(user.id)}>
                    <RiDeleteBin3Line></RiDeleteBin3Line>
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};
