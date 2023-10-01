import { useContext, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PasswordsList from "./components/PasswordsList";
import RightSideBar from "./components/RightSideBar";
import {
  PasswordListContext,
  PasswordListContextProvider,
} from "./context/PasswordListContext";
import { TagContextProvider } from "./context/TagContext";
import LandingPage from "./components/landingPage/LandingPage";
function App() {
  const { hasRegistry } = useContext(PasswordListContext);
  return (
    <>
      {hasRegistry ? (
        <div className="flex flex-col">
          <NavBar />
          <div className="flex">
            <div className="flex-1 m-2">
              <PasswordsList />
            </div>
            <RightSideBar />
          </div>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  );
}

export default App;
