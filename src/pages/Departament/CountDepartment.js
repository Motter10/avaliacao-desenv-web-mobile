import { useDepartments } from "../../context/DepartmentContext";

export default function CountDepartment() {
  const { departaments } = useDepartments();

  return <h5>Total de Registros: {departaments.length}</h5>;
}
