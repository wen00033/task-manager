import Header from "./Components/Header";
import { useTheme } from "./Components/Theme";
import { Outlet } from "react-router";

function App() {
  const lightMode = useTheme();

  return (
    <>
      {/* set dark as default, remember to change it back   */}
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
