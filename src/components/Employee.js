const Employee = ({employees}) => {
    return (

        <>
        {
            employees.map((employee) =>(
            <tr key={employee.id} >
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>

                </td>
            </tr>
            ))
        }</>
        
    )
}

export default Employee