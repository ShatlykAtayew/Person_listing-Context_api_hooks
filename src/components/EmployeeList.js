import Employee from "./Employee";
import { useContext, useState, useEffect, useRef, useReducer } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { EmployeeContext } from "../context/EmployeeContext";
import AddForm from "./AddForm";
import Pagination from "./Pagination";


const EmployeeList = () => {

  const { sortedEmployees } = useContext(EmployeeContext);

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(2);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);

  }

  useEffect(() => {
    handleClose();
    return () => {
      handleShowAlert();
    }
  }, [sortedEmployees])

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);


  const myRef = useRef(null);

  const onButtonClick = () => {
    myRef.current.focus();
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case 'increment':
        return {count: state.count +1}

      case 'decrement':
        return {count: state.count -1}

      default:
        throw new Error();
    }
  }

  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>Manage <b>Employees</b></h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} type="button" className="btn btn-primary text-white" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Button>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissable>
        Employee List successfully updated!.
      </Alert>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{
          //employees.sort((a,b) => a.name.localCompare(b.name)).map((employee) => (
          currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <Employee employee={employee} />
            </tr>
          ))
        }
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentEmployees={currentEmployees}
        sortedEmployees={sortedEmployees}

      />

      Count : {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <input ref={myRef} type="text"></input>
      <button onClick={onButtonClick}>Focus Input</button>

    </>


  )

}

export default EmployeeList