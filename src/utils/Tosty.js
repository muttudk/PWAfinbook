import React, { useEffect } from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tosty({ status, message,clearToast }) {
  useEffect(() => {
    if (status && message) {
      showtoast();
    }
    return ()=>{
        clearToast();
    }
  }, [status, message]);

  const showtoast = () => {
    if (status === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default Tosty;
