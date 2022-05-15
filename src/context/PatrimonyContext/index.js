import React, { createContext, useContext, useState } from "react";

const PatrimonyContext = createContext();

export default function PatrimonyProvider({ children }) {
    const [patrimonies, setPatrimonies] = useState([]);

    const [patrimonyModal, setPatrimonyModal] = useState({
        id: -1,
        name: "",
        description: "",
        price: 0,
        departament: 0,
        categories: {},
    });

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [typeCrud, setTypeCrud] = useState("NEW");

    function newPatrimony() {
        setTypeCrud("NEW");
        setPatrimonyModal({ id: -1, name: "", description: "", price: 0, departament: 0, categories: {} });
        handleShowModal();
    }

    function editPatrimony(Patrimony) {
        setTypeCrud("EDIT");
        setPatrimonyModal(Patrimony);
        handleShowModal();
    }

    function deletePatrimony(id) {
        let confirmDelete = window.confirm("Confirma a exclusão do ítem?");
        if (confirmDelete) {
            let novaLista = patrimonies.filter((item) => item.id !== id);

            setPatrimonies([...novaLista]);
        }
    }

    return ( < PatrimonyContext.Provider value = {
            {
                patrimonies,
                setPatrimonies,
                newPatrimony,
                editPatrimony,
                deletePatrimony,
                typeCrud,
                patrimonyModal,
                handleCloseModal,
                showModal,
                setPatrimonyModal,
            }
        } > { children } < /PatrimonyContext.Provider>);
    }

    export function usePatrimonies() {
        const context = useContext(PatrimonyContext);
        const {
            patrimonies,
            setPatrimonies,
            newPatrimony,
            editPatrimony,
            deletePatrimony,
            typeCrud,
            patrimonyModal,
            handleCloseModal,
            showModal,
            setPatrimonyModal,
        } = context;

        return {
            patrimonies,
            setPatrimonies,
            newPatrimony,
            editPatrimony,
            deletePatrimony,
            typeCrud,
            patrimonyModal,
            handleCloseModal,
            showModal,
            setPatrimonyModal,
        };
    }