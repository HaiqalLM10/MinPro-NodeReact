import {
  useState,
  useEffect,
  } from "react";
import {
  Button,
  Row,
  Table,
  Col,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import Form from "./form";
import request from "../../request";

const Dashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formEdited, setFormEdited] = useState({});

  const handleCreate = () => {
    setFormType("create");
    setFormVisible(true);
  }

  const handleDelete = (id) => {
    request.delete(`/employee/${id}`)
      .then(() => fetchData())
      .catch(err => alert(err))
  }

  const handleEdit = (form) => {
    setFormEdited(form);
    setFormType("edit");
    setFormVisible(true);
  }


  const fetchData = async () => {
    await request.get('/product')
      .then(({ data }) => {
        setEmployeeList(data)
      })
      .catch(err => alert(err))
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="dashboard-container" style={{ margin: "0px 250px" }}>
      <h1> Products List </h1>
      <br />
      <Row>
        <Col>
          <Button color="primary" onClick={() => handleCreate()} > Add Data + </Button>
        </Col>
      </Row>
      <br />  <br />
      <Table striped width={200}>
        <thead>
          <tr>
            <th>No</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((row, idx) => (
            <tr key={idx}>
              <th scope="row">
                {idx + 1}
              </th>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.description}</td>
              <td>{row.quantity}</td>
              <td>{row.price}</td>
              <td>
                <Button onClick={() => handleEdit(row)} > Edit</Button>
                &nbsp;&nbsp;
                <Button color="danger" onClick={() => handleDelete(row.id)} > Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}

      <Modal
        isOpen={formVisible}
        toggle={() => setFormVisible(!formVisible)}
      >
        <ModalHeader>{`Form ${formType} data`}</ModalHeader>
        <ModalBody>
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

export default Dashboard;