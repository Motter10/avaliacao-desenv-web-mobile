import React, { createContext, useContext, useState } from "react";

const DepartmentContext = createContext();

export default function DepartmentProvider({ children }) {
  const [departaments, setDepartaments] = useState([]);

  const [departamentModal, setDepatamentModal] = useState({ id: -1, name: "" });

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [typeCrud, setTypeCrud] = useState("NEW");

  function newDepartament() {
    setTypeCrud("NEW");
    setDepatamentModal({ id: -1, name: "" });
    handleShowModal();
  }

  function editDepartament(departament) {
    setTypeCrud("EDIT");
    setDepatamentModal(departament);
    handleShowModal();
  }

  function deleteDepartament(id) {
    let confirmDelete = window.confirm("Confirma a exclusão do ítem?");
    if (confirmDelete) {
      let novaLista = departaments.filter((item) => item.id !== id);

      setDepartaments([...novaLista]);
    }
  }

  return (
    <DepartmentContext.Provider
      value={{
        departaments,
        setDepartaments,
        newDepartament,
        editDepartament,
        deleteDepartament,
        typeCrud,
        departamentModal,
        handleCloseModal,
        showModal,
        setDepatamentModal,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartments() {
  const context = useContext(DepartmentContext);
  const {
    departaments,
    setDepartaments,
    newDepartament,
    editDepartament,
    deleteDepartament,
    typeCrud,
    departamentModal,
    handleCloseModal,
    showModal,
    setDepatamentModal,
  } = context;

  return {
    departaments,
    setDepartaments,
    newDepartament,
    editDepartament,
    deleteDepartament,
    typeCrud,
    departamentModal,
    handleCloseModal,
    showModal,
    setDepatamentModal,
  };
}
