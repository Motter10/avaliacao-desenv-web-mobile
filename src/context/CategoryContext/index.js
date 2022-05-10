import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export default function CateogryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const [categoryModal, setCategoryModal] = useState({ id: -1, name: "" });

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [typeCrud, setTypeCrud] = useState("NEW");

  function newCategory() {
    setTypeCrud("NEW");
    setCategoryModal({ id: -1, name: "" });
    handleShowModal();
  }

  function editCategory(category) {
    setTypeCrud("EDIT");
    setCategoryModal(category);
    handleShowModal();
  }

  function deleteCategory(id) {
    let confirmDelete = window.confirm("Confirma a exclusão do ítem?");
    if (confirmDelete) {
      let novaLista = categories.filter((item) => item.id !== id);

      setCategories([...novaLista]);
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        newCategory,
        editCategory,
        deleteCategory,
        typeCrud,
        categoryModal,
        handleCloseModal,
        showModal,
        setCategoryModal,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  const {
    categories,
    setCategories,
    newCategory,
    editCategory,
    deleteCategory,
    typeCrud,
    categoryModal,
    handleCloseModal,
    showModal,
    setCategoryModal,
  } = context;

  return {
    categories,
    setCategories,
    newCategory,
    editCategory,
    deleteCategory,
    typeCrud,
    categoryModal,
    handleCloseModal,
    showModal,
    setCategoryModal,
  };
}
