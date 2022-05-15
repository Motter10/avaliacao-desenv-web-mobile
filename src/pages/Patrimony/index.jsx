import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

import Header from "../../components/Header";
import ModalForm from "../../components/ModalForm";
import { useCategories } from "../../context/CategoryContext";
import { useDepartments } from "../../context/DepartmentContext";
import { usePatrimonies } from "../../context/PatrimonyContext";
import CountPatrimony from "./CountPatrimony";

export default function PatrimonyPage() {

    const { patrimonies,
        setPatrimonies,
        newPatrimony,
        editPatrimony,
        deletePatrimony,
        typeCrud,
        patrimonyModal,
        handleCloseModal,
        showModal,
        setPatrimonyModal } = usePatrimonies()

    const { departaments } = useDepartments()
    const { categories } = useCategories()

    const [numberOfCategories, setNumberOfCategories] = useState(Object.keys(patrimonyModal.categories).length)

    useEffect(() => {
        setNumberOfCategories(Object.keys(patrimonyModal.categories).length)
    }, [patrimonyModal.id])

    function handleSubmit(event) {
        event.preventDefault();
        if (patrimonyModal.categories.length < 1) {
            alert("Selecione pelo menos uma categoria")
            return
        }
        
        if (typeCrud === 'NEW') {
            let lastId = 0;
            if (patrimonies.length > 0) {
                lastId = patrimonies[patrimonies.length - 1].id;
            }
            setPatrimonies([
                ...patrimonies,
                {
                    id: lastId + 1,
                    name: patrimonyModal.name,
                    description: patrimonyModal.description,
                    price: patrimonyModal.price,
                    departament: patrimonyModal.departament,
                    categories: patrimonyModal.categories
                }
            ]);
        } else {
            let patrimoniesList = patrimonies;
            for (let index = 0; index < patrimonies.length; index++) {
                const element = patrimonies[index];
                if (element.id === patrimonyModal.id) {
                    patrimoniesList[index] = patrimonyModal;
                }
            }
            setPatrimonies([
                ...patrimoniesList
            ])
        }
        handleCloseModal();
        event.preventDefault();
    }

    const [rows, setRows] = useState([0])

    
    useEffect(() => {
        setRows([])
        for (let i = 0; i < numberOfCategories; i++) {
            setRows(old => [...old, i])
        }
    }, [numberOfCategories, setRows])
    
    // Se clicar no botao de -, remove categoria
    useEffect(() => {
        if(numberOfCategories < Object.keys(patrimonyModal.categories).length)
        {
            setPatrimonyModal(old => {
                const cats = old.categories;
                delete cats[`cat_${numberOfCategories}`]
                
                return {
                    ...patrimonyModal,
                    categories: cats
                }
            })
        }
    }, [numberOfCategories])
    
    function renderRow(row) {
        
        return (
            <Form.Group key={row} size='lg' controlId={`cat_${row.toString()}`}>
                <Form.Select  aria-label="Selecione..."
                    value={patrimonyModal.categories[`cat_${row.toString()}`]}
                    onChange={e => setPatrimonyModal((old) => (
                        {
                            ...patrimonyModal,
                            categories: {...old.categories, [`cat_${row.toString()}`]: e.target.value}
                        }
                    ))}
                    >

                    <option>Open this select menu</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        )
    }

    return (
        <React.Fragment>
            <Header />

            <div className="container">
                <h2>Cadastro de Patrimonios</h2>

                <Button variant="secondary" onClick={newPatrimony}>Novo</Button>

                <br /><br />

                {
                    patrimonies.length === 0
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
                                        <th>Descricao</th>
                                        <th>Preco</th>
                                        <th>Departamento</th>
                                        <th>Categorias</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        patrimonies.map(
                                            departmentLoop => {
                                                return <tr key={departmentLoop.id}>
                                                    <td>{departmentLoop.id}</td>
                                                    <td>{departmentLoop.name}</td>
                                                    <td>{departmentLoop.description}</td>
                                                    <td>{departmentLoop.price}</td>
                                                    <td>{departmentLoop.departament}</td>
                                                    <td>
                                                    {Object.keys(departmentLoop.categories).length &&
                                                        Object.values(departmentLoop.categories).map((category, i) => <p key={i.toString()}>{category}</p> )}
                                                    </td>
                                                    <td>
                                                        <Button variant="outline-secondary"
                                                            onClick={() => editPatrimony(departmentLoop)}
                                                        >
                                                            Editar
                                                        </Button> {' '}
                                                        <Button variant="outline-secondary"
                                                            onClick={() => deletePatrimony(departmentLoop.id)}
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
                            <CountPatrimony />
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
                                value={patrimonyModal.name}
                                onChange={e => setPatrimonyModal(
                                    {
                                        ...patrimonyModal,
                                        name: e.target.value
                                    }
                                )}
                            />
                        </Form.Group>
                        <Form.Group size='lg' controlId="description">
                            <Form.Label>Descricao</Form.Label>
                            <Form.Control
                                autoFocus
                                as="textarea" rows={3}
                                required={true}
                                value={patrimonyModal.description}
                                onChange={e => setPatrimonyModal(
                                    {
                                        ...patrimonyModal,
                                        description: e.target.value
                                    }
                                )}
                            />
                        </Form.Group>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Form.Group size='lg' controlId="price">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    autoFocus
                                    required={true}
                                    value={patrimonyModal.price}
                                    onChange={e => setPatrimonyModal(
                                        {
                                            ...patrimonyModal,
                                            price: e.target.value
                                        }
                                    )}
                                />
                            </Form.Group>
                            <Form.Group size='lg' controlId="departament">
                                <Form.Label>Departamento</Form.Label>
                                <Form.Select aria-label="Selecione..."
                                    value={patrimonyModal.departament}
                                    onChange={e => setPatrimonyModal(
                                        {
                                            ...patrimonyModal,
                                            departament: e.target.value
                                        }
                                    )}>
                                    <option>Open this select menu</option>
                                    {departaments.map((departament) => (
                                        <option key={departament.id} value={departament.name}>{departament.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <section></section>
                        <br />
                        <h6>Informe as Categorias</h6>
                        {/* <Form.Group size='lg' controlId="categories">
                            <Form.Label>Categoria</Form.Label> */}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>
                                    <ul>{rows.map((row) => renderRow(row))}</ul>
                                </div>

                                <Button style={{ marginLeft: 10, height: 37 }} variant="outline-dark" onClick={() => setNumberOfCategories(old => old + 1)}>+</Button>
                                <Button style={{ marginLeft: 10, height: 37 }} variant="outline-dark" onClick={() => setNumberOfCategories(old => old > 0 && old - 1)}>-</Button>

                            </div>
                        {/* </Form.Group> */}
                    </Form>
                </ModalForm>


            </div>
        </React.Fragment>
    );
}