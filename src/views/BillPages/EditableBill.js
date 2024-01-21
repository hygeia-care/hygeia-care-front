import { useState } from "react";
import Bill from "./Bill.js";
import EditBill from "./EditBill.js";

function EditableBill(props) {
    const [isEditing, setIsEditing] = useState(false);

    function saveBill(bill) {
        const result = props.onEdit(bill);
        if (result) {
            setIsEditing(false);
        }
    }

    var billRender;
    if (isEditing) {
        billRender = <EditBill bill={props.bill} onDelete={props.onDelete} onSave={saveBill}/>;
    } else {
        billRender = <Bill bill={props.bill} onDelete={props.onDelete} onEdit={() => setIsEditing(true)}/>;
    }

    return billRender;
}

export default EditableBill;