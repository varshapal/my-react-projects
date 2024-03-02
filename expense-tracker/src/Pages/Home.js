import { useHistory } from "react-router-dom";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";


const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.auth.token);

  const updateProfile = () => {
    history.push("/profile");
  };

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBL0Dxkr3qq-HpRREjZfDFI5--szzAAycs",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
            //'X-Firebase-Locale': "hi"
          },
        }
      );
      const data = await response.json();
      //console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>
        Your profile is incomplete
        <button onClick={updateProfile}>Complete Now</button>
        <button onClick={verifyEmailHandler}>Verify Email Id</button>
      </p>
    </div>
  );
};

export default Home;
