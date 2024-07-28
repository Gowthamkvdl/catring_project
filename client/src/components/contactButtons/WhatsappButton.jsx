import React from "react";

const WhatsappButton = ({ phoneNumber, message }) => {
  const openWhatsApp = (phoneNumber, message) => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      className="btn btn-success"
      onClick={() => openWhatsApp(phoneNumber, message)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-whatsapp"
        viewBox="0 0 16 16"
      >
        <path d="M13.603 2.397a7.947 7.947 0 0 0-5.304-2.197 7.978 7.978 0 0 0-8 8 7.978 7.978 0 0 0 8 8 7.978 7.978 0 0 0 4.343-1.31.796.796 0 0 0 .164-1.122l-1.454-2.172a.799.799 0 0 0-.872-.316c-.62.172-1.243.373-1.875.6-.365.125-.746.17-1.123.16a4.903 4.903 0 0 1-4.217-2.837 5.17 5.17 0 0 1-.496-1.785c-.024-.323.017-.646.123-.96.15-.446.318-.887.51-1.323a.798.798 0 0 0-.153-.862l-1.45-1.45a.796.796 0 0 0-.862-.153c-.436.192-.877.36-1.323.51-.314.106-.637.147-.96.123a5.177 5.177 0 0 1-1.785-.496 4.903 4.903 0 0 1-2.837-4.217c-.01-.378.035-.758.16-1.123.227-.632.428-1.255.6-1.875a.799.799 0 0 0-.316-.872L2.073 2.23a.796.796 0 0 0-1.122.164A7.947 7.947 0 0 0 0 8a7.947 7.947 0 0 0 2.397 5.603A7.947 7.947 0 0 0 8 16a7.947 7.947 0 0 0 5.603-2.397A7.947 7.947 0 0 0 16 8a7.947 7.947 0 0 0-2.397-5.603z" />
      </svg>
    </button>
  );
};

export default WhatsappButton;
