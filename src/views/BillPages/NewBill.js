import { useState } from "react"

function NewBill(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [total, setTotal] = useState('');
    const [services, setServices] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [patient, setPatient] = useState('');
    const [appointment, setAppointment] = useState('');

    function onClick() {
        const newBill = {
            name: name,
            description: description,
            total: total,
            services: services,
            issueDate: issueDate,
            patient: patient,
            appointment: appointment
        };
        const result = props.onAddBill(newBill);

        if (result) {
            setName('');
            setDescription('');
            setTotal('');
            setServices('');
            setIssueDate('');
            setPatient();   
            setAppointment();
        }
    }

    return (
        <tr>
            <td><input className="form-control" name="name" value={name} onChange={(event) => setName(event.target.value)}/></td>
            <td><input className="form-control" name="description" value={description} onChange={(event) => setDescription(event.target.value)}/></td>
            <td><input className="form-control" name="total" value={total} onChange={(event) => setTotal(event.target.value)}/></td>
            <td><input className="form-control" name="services" value={services} onChange={(event) => setServices(event.target.value)}/></td>
            <td><input className="form-control" name="issueDate" value={issueDate} onChange={(event) => setIssueDate(event.target.value)}/></td>
            <td><input className="form-control" name="patient" value={patient} onChange={(event) => setPatient(event.target.value)}/></td>
            <td><input className="form-control" name="appointment" value={appointment} onChange={(event) => setAppointment(event.target.value)}/></td>
            <td><button className="btn btn-primary" onClick={onClick}>Add Bill</button></td>
        </tr>
    )
}

export default NewBill;