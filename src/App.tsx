import { useAuth0 } from "@auth0/auth0-react";

import { Login } from "./components/pages/Login/Login";
import { LogOut } from "./components/pages/LogOut/LogOut";
import { Profile } from "./components/pages/Profile/Profile";


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
