import { useState } from "react";

function EditBill(props) {
 
    const [name, setName] = useState(props.bill.name);
    const [description, setDescription] = useState(props.bill.name);
    const [total, setTotal] = useState(props.bill.totla);
    const [services, setServices] = useState(props.bill.services);
    const [issueDate, setIssueDate] = useState(props.bill.issueDate);
    const [patient, setPatient] = useState(props.bill.patient);
    const [appointment, setAppointment] = useState(props.bill.appointment);


    return (
        <tr>           
            <td><input className="form-control" name="name" value={name} onChange={(event) => setName(event.target.value)}/></td>
            <td><input className="form-control" name="description" value={description} onChange={(event) => setDescription(event.target.value)}/></td>
            <td><input className="form-control" name="total" value={total} onChange={(event) => setTotal(event.target.value)}/></td>
            <td><input className="form-control" name="services" value={services} onChange={(event) => setServices(event.target.value)}/></td>
            <td><input className="form-control" name="issueDate" value={issueDate} onChange={(event) => setIssueDate(event.target.value)}/></td>
            <td><input className="form-control" name="patient" value={patient} onChange={(event) => setPatient(event.target.value)}/></td>
            <td><input className="form-control" name="appointment" value={appointment} onChange={(event) => setAppointment(event.target.value)}/></td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onSave({name: name, description:description})}>Save</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.bill)}>Delete</button>
            </td>
        </tr>
    )
}

export default EditBill;