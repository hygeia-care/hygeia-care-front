function Bill(props) {

    return (
        <tr>
            <td id={`bill-name-${props.bill._id}`}>{props.bill.name}</td>
            <td id={`bill-description-${props.bill._id}`}>{props.bill.description}</td>
            <td id={`bill-total-${props.bill._id}`}>{props.bill.total}</td>
            <td id={`bill-services-${props.bill._id}`}>{props.bill.services}</td>
            <td id={`bill-issueDate-${props.bill._id}`}>{props.bill.issueDate}</td>
            <td id={`bill-patient-${props.bill._id}`}>{props.bill.patient}</td>
            <td id={`bill-appointment-${props.bill._id}`}>{props.bill.appointment}</td>
            <td id={`bill-buttons-${props.bill._id}`}>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.bill)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.bill)}>Delete</button>
            </td>
        </tr>
    )
}

export default Bill;