import React, { useState } from "react";

function Edit({ displayName, onSave, onCancel }) {
  const [newDisplayName, setNewDisplayName] = useState(displayName || "");

  const handleInputChange = (event) => {
    setNewDisplayName(event.target.value);
  };

  const handleSaveClick = () => {
    onSave(newDisplayName);
  };

  return (
    <div className="edit-box">
      <input
        type="text"
        placeholder="Enter a new name"
        value={newDisplayName} 
        onChange={handleInputChange}
      />
      <svg
        className="cancelbut"
        onClick={onCancel}
        fill="#cfcfcf"
        version="1.1"
        baseProfile="tiny"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        width="64px"
        height="64px"
        viewBox="0 0 42 42"
        xmlSpace="preserve"
      >
        <path
          fillRule="evenodd"
          d="M21.002,26.588l10.357,10.604c1.039,1.072,1.715,1.083,2.773,0l2.078-2.128 c1.018-1.042,1.087-1.726,0-2.839L25.245,21L36.211,9.775c1.027-1.055,1.047-1.767,0-2.84l-2.078-2.127 c-1.078-1.104-1.744-1.053-2.773,0L21.002,15.412L10.645,4.809c-1.029-1.053-1.695-1.104-2.773,0L5.794,6.936 c-1.048,1.073-1.029,1.785,0,2.84L16.759,21L5.794,32.225c-1.087,1.113-1.029,1.797,0,2.839l2.077,2.128 c1.049,1.083,1.725,1.072,2.773,0L21.002,26.588z"
        />
      </svg>
      <svg
        className="confirmbut"
        onClick={handleSaveClick}
        fill="#cfcfcf"
        height="64px"
        width="64px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 492 492"
        xmlSpace="preserve"
      >
        <path
          d="M484.128,104.478l-16.116-16.116c-5.064-5.068-11.816-7.856-19.024-7.856c-7.208,0-13.964,2.788-19.028,7.856 L203.508,314.81L62.024,173.322c-5.064-5.06-11.82-7.852-19.028-7.852c-7.204,0-13.956,2.792-19.024,7.852l-16.12,16.112 C2.784,194.51,0,201.27,0,208.47c0,7.204,2.784,13.96,7.852,19.028l159.744,159.736c0.212,0.3,0.436,0.58,0.696,0.836 l16.12,15.852c5.064,5.048,11.82,7.572,19.084,7.572h0.084c7.212,0,13.968-2.524,19.024-7.572l16.124-15.992 c0.26-0.256,0.48-0.468,0.612-0.684l244.784-244.76C494.624,132.01,494.624,114.966,484.128,104.478z"
        />
      </svg>
    </div>
  );
}

export default Edit;
