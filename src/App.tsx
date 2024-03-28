import Header from "./Features/TaskManager/Header";
import { useMediaQuery } from "usehooks-ts";
import { Outlet } from "react-router";
import { useState } from "react";
import { CircleEqual } from "lucide-react";

function App() {
  // responsive media query
  const [fold, setFold] = useState(false);
  const matches = useMediaQuery("(min-width: 800px)");
  // ============================
  const closeHandler = function () {
    setFold(!fold);
  };

  return (
    <>
      {/* set dark as default, remember to change it back   */}
      <div className="wrapper dark ">
        {matches && <Header />}
        {!matches && (
          <>
            <CircleEqual onClick={closeHandler} className="main-task-toggle" />
            <Header animation={fold ? "slideOut" : "slideIn"} />
          </>
        )}
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
