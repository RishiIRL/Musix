function Confirm({ onCancel, onConfirm }) {
    return (
      <div className="popup">
        <h1>You sure?</h1>
        <div className="yesorno">
          <button className="no" onClick={onCancel}>No</button>
          <button className="yes" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    );
  }
  
  export default Confirm;
  