import Header from "./Components/Header";
import { useTheme } from "./Components/Theme";
import { Outlet } from "react-router";
function App() {
  const lightMode = useTheme();

  return (
    <>
      <div className={`wrapper ${lightMode ? "" : "dark"}`}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
