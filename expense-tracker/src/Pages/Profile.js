import { useRef, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const nameInputRef = useRef();
  const photoUrlRef = useRef();

  const updateHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBL0Dxkr3qq-HpRREjZfDFI5--szzAAycs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setProfile(data.providerUserInfo);
    alert("profile completed");

    const response1 = await fetch(
      "https://react-http-9242d-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data1 = await response1.json();
    console.log("profile", data1);
  }

  const fetchData = async () => {
    const response2 = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBL0Dxkr3qq-HpRREjZfDFI5--szzAAycs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data2 = await response2.json();
    console.log("data2", data2);
    //setProfile(data2.users);

    nameInputRef.current.value = data2.users[0].displayName;
    photoUrlRef.current.value = data2.users[0].photoUrl;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className={classes.profile}>
      <h3>Contact Details</h3>
      <form onSubmit={updateHandler}>
        {/* <button>Cancel</button> */}
        <label>
          Full Name:
          <input type="text" ref={nameInputRef} />
        </label>
        <label>
          Profile Photo URL
          <input type="text" ref={photoUrlRef} />
        </label>
        <button type="submit">update</button>
      </form>

      <p>
        
        <strong>Profile Details</strong>
        {profile.map((item) => (
          <p key={item.id}>
            <strong>name:</strong> {item.displayName}- <strong>email:</strong> {item.email} - <strong>photoUrl:</strong> {item.photoUrl} 
            
          </p>
        ))}
      </p>
      
    </section>
  );
};

export default Profile;
