function Bill(props) {
    return (
        <tr>
            <td>{props.bill.name}</td>
            <td>{props.bill.description}</td>
            <td>{props.bill.total}</td>
            <td>{props.bill.services}</td>
            <td>{props.bill.issueDate}</td>
            <td>{props.bill.patient}</td>
            <td>{props.bill.appointment}</td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.bill)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.bill)}>Delete</button>
            </td>
        </tr>
    )
}

export default Bill;