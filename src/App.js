import CateogryProvider from "./context/CategoryContext";
import DepartmentProvider from "./context/DepartmentContext";
import RoutesApp from "./routes";

function App() {
  return (
    <CateogryProvider>
      <DepartmentProvider>
        <RoutesApp />
      </DepartmentProvider>
    </CateogryProvider>
  );
}

export default App;
