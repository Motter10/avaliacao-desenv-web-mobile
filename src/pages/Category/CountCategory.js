import { useCategories } from "../../context/CategoryContext";

export default function CountCategory() {
  const { categories } = useCategories();

  return <h5>Total de Registros: {categories.length}</h5>;
}
