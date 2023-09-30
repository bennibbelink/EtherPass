import "./App.css";
import NavBar from "./components/NavBar";
import PasswordsList from "./components/PasswordsList";
import RightSideBar from "./components/RightSideBar";
import { PasswordListContextProvider } from "./context/PasswordListContext";
import { TagContextProvider } from "./context/TagContext";
function App() {
  return (
    <PasswordListContextProvider>
      <TagContextProvider>
        <div className="flex flex-col">
          <NavBar />
          <div className="flex">
            <div className="flex-1 m-2">
              <PasswordsList />
            </div>
            <RightSideBar />
          </div>
        </div>
      </TagContextProvider>
    </PasswordListContextProvider>
  );
}

export default App;
