import React, { useState, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Form
} from 'reactstrap';
import request from '../../request';

const FormInput = ({ type, refetch, setVisible, formEdited }) => {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const form = { name, description, quantity, price };

    if (type === 'create') {
      await request.post(`/product`, form)
        .then(() => refetch())
        .catch(err => alert(err))

    } else {
      await request.put(`/product/${formEdited.id}`, form)
        .then(() => refetch())
        .catch(err => alert(err))
    }

    setVisible(false);
  }

  useEffect(() => {
    if (type === "edit") {
      setName(formEdited.name)
      setDescription(formEdited.description)
      setQuantity(formEdited.quantity)
      setPrice(formEdited.price)
    }
  }, [formEdited, type])

  return (
    <>
      <Row>
        <Form onSubmit={handleSubmitForm}>
          <>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                placeholder="please enter name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                value={description}
                placeholder="please enter description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={quantity}
                placeholder="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                value={price}
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormGroup>
            
          </>
          <Row>
            <Col>
              <Button color="primary" type="submit"> Submit</Button>
            </Col>
            <Col>
              <Button onClick={() => setVisible(false)} > Cancel </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </>
  )
}

export default FormInput