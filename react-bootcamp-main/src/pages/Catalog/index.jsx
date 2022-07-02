import React, { useEffect, useState } from "react";
import { Col, Modal, Row, ModalHeader, ModalBody } from "reactstrap";
import './style.css'
import Catalog from "react-catalog-view";
import Form from "./form";
import request from "../../request";

const Catalogs = () => {

    const handleSignIn = () => {
        sessionStorage.removeItem('access_token');
        window.location = '/login'
    }

    const [productList, setProductList] = useState([]);
    const [formType, setFormType] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formEdited, setFormEdited] = useState({});

    const handleViewProduct = (form) => {
        setFormEdited(form);
        setFormType("detail");
        setFormVisible(true);
    }

    const fetchData = async () => {
        await request.get('/product')
            .then(({ data }) => {
                setProductList(data)
            })
            .catch(err => alert(err))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const CONTENT_KEYS =
    {
        imgKey: "image",
        cardTitleKey: "name",
        cardDescriptionKey: "description",
        priceKey: "price",
    };


    return (
        <div className="catalog_page">
            <div className="header">
                <Row>
                    <Col md={11}>
                        <h3> Welcome to Our Catalog</h3>
                    </Col>
                    <Col md={1}>
                        <span className="signin" onClick={() => handleSignIn()} > Login </span>
                    </Col>
                </Row>
            </div>
            <div>
                <Catalog
                    data={productList}
                    contentKeys={CONTENT_KEYS}
                    skeleton={0}
                    cardSize="sm"
                    btnOneText="View" 
                    btnTwoText="Purchase Now"
                    btnOneHandler={(args, event, objectData) => {
                        handleViewProduct(event);
                    }}
                    btnTwoHandler={(args, event, row) => {
                    }}
                    imageClickHandler={(args, event, row) => {
                    }}

                />
            </div>
            <Modal
                            isOpen={formVisible}
                            toggle={() => setFormVisible(!formVisible)}
                        >
                            <ModalHeader className="detail_header">{`Detail Product`}</ModalHeader>
                            <ModalBody className="detail_body">
                                <Form
                                    type={formType}
                                    refetch={fetchData}
                                    setVisible={setFormVisible}
                                    formEdited={formEdited}
                                />
                            </ModalBody>
                        </Modal>
        </div>

    )
}

export default Catalogs;