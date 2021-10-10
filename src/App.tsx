import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "./components/Login/Login";
import { LogOut } from "./components/LogOut/LogOut";
import { Profile } from "./components/Profile/Profile";


const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div >
        {isAuthenticated ? (
          <>
            <Profile />
            <LogOut />
          </>
        ) : (
          <Login />
        )}
    </div>
  );
}

export default App;
