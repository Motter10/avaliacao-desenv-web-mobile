import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import { useCategories } from "../../context/CategoryContext";
import CountCategory from "./CountCategory";

export default function CategoryPage() {

    const { categories,
        setCategories,
        newCategory,
        editCategory,
        deleteCategory,
        typeCrud,
        categoryModal,
        handleCloseModal,
        showModal,
        setCategoryModal, } = useCategories()

    function handleSubmit(event) {
        if (typeCrud === 'NEW') {
            let lastId = 0;
            if (categories.length > 0) {
                lastId = categories[categories.length - 1].id;
            }
            setCategories([
                ...categories,
                {
                    id: lastId + 1,
                    name: categoryModal.name
                }
            ]);
        } else {
            let categoriesList = categories;
            for (let index = 0; index < categories.length; index++) {
                const element = categories[index];
                if (element.id === categoryModal.id) {
                    categoriesList[index] = categoryModal;
                }
            }
            setCategories([
                ...categoriesList
            ])
        }
        handleCloseModal();
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <Header />

            <div className="container">
                <h2>Cadastro de Categorias</h2>

                <Button variant="secondary" onClick={newCategory}>Novo</Button>

                <br /><br />

                {
                    categories.length === 0
                        ? <div className='container'>
                            <h4>Nenhum registro cadastrado</h4>
                        </div>
                        :
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nome</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map(
                                            departmentLoop => {
                                                return <tr key={departmentLoop.id}>
                                                    <td>{departmentLoop.id}</td>
                                                    <td>{departmentLoop.name}</td>
                                                    <td>
                                                        <Button variant="outline-secondary"
                                                            onClick={() => editCategory(departmentLoop)}
                                                        >
                                                            Editar
                                                        </Button> {' '}
                                                        <Button variant="outline-secondary"
                                                            onClick={() => deleteCategory(departmentLoop.id)}
                                                        >
                                                            Excluir
                                                        </Button>
                                                    </td>
                                                </tr>
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                            <CountCategory />
                        </>
                }

                <ModalForm
                    title='Edição Registro'
                    showModal={showModal}
                    closeModal={handleCloseModal}
                >
                    <Form id='myForm' onSubmit={handleSubmit}>
                        <Form.Group size='lg' controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                autoFocus
                                required={true}
                                value={categoryModal.name}
                                onChange={e => setCategoryModal(
                                    {
                                        ...categoryModal,
                                        name: e.target.value
                                    }
                                )}
                            />
                        </Form.Group>
                    </Form>
                </ModalForm>


            </div>
        </React.Fragment>
    );
}