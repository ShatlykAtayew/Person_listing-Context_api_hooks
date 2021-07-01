import {Form, Button} from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import { useContext, useState, useEffect } from "react";

const AddForm = () => {

    const {addEmployee} = useContext(EmployeeContext);

    /* const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState(""); */

    const [newEmployee, setNewEmployee] = useState({
        name:"", email:"", address:"", phone:""
    })

    const {name, email, address, phone} = newEmployee;

    const onInputChange = (e) => {
        setNewEmployee({...newEmployee, [e.target.name]: e.target.value})
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(name, email, address, phone);
    }

    useEffect(() => {
        console.log("Component mounted");

        return () => {
            console.log("Component unmounted")
        }
        
    }, []);


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={e => onInputChange(e)}
                /* value={name}
                onChange={e => setName(e.target.value)} */
                required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={e => onInputChange(e)}
                /* value={email}
                onChange={e => setEmail(e.target.value)} */
                required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                as="textarea"
                placeholder="Adress"
                name="address"
                value={address}
                onChange={e => onInputChange(e)}
                /* value={address}
                onChange={e => setAddress(e.target.value)} */
                rows={3}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={e => onInputChange(e)}
                /* value={phone}
                onChange={e => setPhone(e.target.value)} */
                />
            </Form.Group>

            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>
    )
}

export default AddForm