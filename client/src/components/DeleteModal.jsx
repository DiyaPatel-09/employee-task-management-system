import "./DeleteModal.css";

function DeleteModal({

    isOpen,

    onClose,

    onDelete,

    message,

    confirmText = "Delete",

    cancelText = "Cancel"

}) {

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">

      <div className="popup-box">

        <h2>{message}</h2>

        <div className="popup-actions">

          <button
    className="cancel-btn"
    onClick={onClose}
>
    {cancelText}
</button>

          <button
    className="delete-btn"
    onClick={onDelete}
>
    {confirmText}
</button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;