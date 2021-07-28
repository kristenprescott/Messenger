import { useAuthDispatch } from "../Context/auth";
import Navbar from "../Components/Navbar";
import Users from "../Components/Users";
import Messages from "../Components/Messages";

export default function Home({ history }) {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");
  };

  return (
    <>
      <Navbar logout={logout} />
      <div className="App">
        <div className="Home">
          <Users />
          <Messages />
        </div>
      </div>
    </>
  );
}
