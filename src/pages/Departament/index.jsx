import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import { useDepartments } from "../../context/DepartmentContext";
import CountDepartment from "./CountDepartment";

export default function DepartamentPage() {

    const { departaments,
        setDepartaments,
        newDepartament,
        editDepartament,
        deleteDepartament,
        typeCrud,
        departamentModal,
        handleCloseModal,
        showModal,
        setDepatamentModal } = useDepartments()



    function handleSubmit(event) {
        if (typeCrud === 'NEW') {
            let lastId = 0;
            if (departaments.length > 0) {
                lastId = departaments[departaments.length - 1].id;
            }
            setDepartaments([
                ...departaments,
                {
                    id: lastId + 1,
                    name: departamentModal.name
                }
            ]);
        } else {
            let departamentsList = departaments;
            for (let index = 0; index < departaments.length; index++) {
                const element = departaments[index];
                if (element.id === departamentModal.id) {
                    departamentsList[index] = departamentModal;
                }
            }
            setDepartaments([
                ...departamentsList
            ])
        }
        handleCloseModal();
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <Header />

            <div className="container">
                <h2>Cadastro de Departamentos</h2>

                <Button variant="secondary" onClick={newDepartament}>Novo</Button>

                <br /><br />

                {
                    departaments.length === 0
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
                                        departaments.map(
                                            departmentLoop => {
                                                return <tr key={departmentLoop.id}>
                                                    <td>{departmentLoop.id}</td>
                                                    <td>{departmentLoop.name}</td>
                                                    <td>
                                                        <Button variant="outline-secondary"
                                                            onClick={() => editDepartament(departmentLoop)}
                                                        >
                                                            Editar
                                                        </Button> {' '}
                                                        <Button variant="outline-secondary"
                                                            onClick={() => deleteDepartament(departmentLoop.id)}
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
                            <CountDepartment />
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
                                value={departamentModal.name}
                                onChange={e => setDepatamentModal(
                                    {
                                        ...departamentModal,
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