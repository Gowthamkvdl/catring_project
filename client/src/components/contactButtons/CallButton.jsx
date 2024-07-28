import React from 'react'

const CallButton = () => {
  const openPhoneApp = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={() => openPhoneApp(phoneNumber)}
    >
      <ion-icon name="call"></ion-icon>
    </button>
  );
}

export default CallButton