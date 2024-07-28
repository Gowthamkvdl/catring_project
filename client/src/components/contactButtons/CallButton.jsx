import React from 'react'

const CallButton = ({phoneNumber}) => {
  const openPhoneApp = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <button
      className="btn btn-sm btn-primary mb-1"
      onClick={() => openPhoneApp(phoneNumber)}
    >
      <ion-icon name="call"></ion-icon>
    </button>
  );
}

export default CallButton