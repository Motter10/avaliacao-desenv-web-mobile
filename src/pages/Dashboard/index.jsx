import React, { useEffect } from "react";

import {Alert, Card} from 'react-bootstrap'

import Header from "../../components/Header";
import {useCategories} from "../../context/CategoryContext"
import {useDepartments} from "../../context/DepartmentContext"
import {usePatrimonies} from "../../context/PatrimonyContext"

export default function DashboardPage() {
    const {categories} = useCategories()
    const {departaments} = useDepartments()
    const {patrimonies} = usePatrimonies()

    return(
        <React.Fragment>
            <div className="container">
                <Header />
                <Alert variant="success" style={{marginTop: 20}}>
                    <Alert.Heading>Olá, Seja Bem-Vindo!</Alert.Heading>
                    <p>Selecione a opção desejada no menu acima</p>
                </Alert>
                <div style={{display: "flex", justifyContent: 'space-between'}}>
                <Card
                    bg="dark"
                    text="white"
                    style={{ width: '80%', marginRight: 5, marginLeft: 5 }}
                    className="mb-2"
                    >
                        <Card.Header>Departamentos</Card.Header>
                        <Card.Body>
                            <Card.Title> {departaments.length} </Card.Title>
                            <Card.Text>
                            departamentos cadastrados
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card
                        bg="light"
                        text="dark"
                        style={{ width: '80%', marginRight: 5, marginLeft: 5 }}
                        className="mb-2"
                        >
                        <Card.Header>Categorias</Card.Header>
                        <Card.Body>
                            <Card.Title> {categories.length} </Card.Title>
                            <Card.Text>
                            categorias cadastradas
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    
                    <Card
                        bg="success"
                        text="white"
                        style={{ width: '80%', marginRight: 5, marginLeft: 5 }}
                        className="mb-2"
                        >
                        <Card.Header>Patrimônios</Card.Header>
                        <Card.Body>
                            <Card.Title> {patrimonies.length} </Card.Title>
                            <Card.Text>
                            patrimônios cadastrados
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
}