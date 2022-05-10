import CateogryProvider from "./context/CategoryContext";
import DepartmentProvider from "./context/DepartmentContext";
import PatrimonyProvider from "./context/PatrimonyContext";
import RoutesApp from "./routes";

function App() {
  return (
    <PatrimonyProvider>
      <CateogryProvider>
        <DepartmentProvider>
          <RoutesApp />
        </DepartmentProvider>
      </CateogryProvider>
    </PatrimonyProvider>
  );
}

export default App;
