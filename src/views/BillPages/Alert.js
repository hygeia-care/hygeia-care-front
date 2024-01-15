function Alert({message, onClose}) {
    if (message == null) {
        return null;
    }

    return (
        <div className="alert alert-warning alert-dismissable">
            <strong>Error!</strong> {message}
            <button type="button" className="close" onClick={() => onClose()}>
                <span>&times;</span>
            </button>
        </div>
    )
}

export default Alert;