import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Post } from '../api/FetchApi';

const AccountRegForm = ({ isVisible, handleClose, modalData, modalMode, handleSubmit }) => {

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const [usertype, setusertype] = useState(null);
  const [vtype, setvtype] = useState(null);

  const data = {
    apikey: "getpopLdgmast",
    tokenkey: userInfo.token,
  }

  const GenarateForm = {
    PLAC: {
      date: true,
      acno: true,
      custspinner: true,
      Roi: true,
      RoiType: true,
      Duration: true,
      DurationType: true,
      MaturityDate: true,
      EmiType: true,
      Note: true,
    },
    SBAC: {
      date: true,
      acno: true,
      custspinner: true,
      Roi: true,
      RoiType: true,
      Duration: false,
      DurationType: false,
      MaturityDate: false,
      EmiType: false,
      Note: true,
    },
    SHAC: {
      date: true,
      acno: true,
      custspinner: true,
      Roi: true,
      RoiType: true,
      Duration: false,
      DurationType: false,
      MaturityDate: false,
      EmiType: false,
      Note: true,
    },
    PGAC: {
      date: true,
      acno: true,
      custspinner: true,
      Roi: true,
      RoiType: true,
      Duration: true,
      DurationType: true,
      MaturityDate: true,
      EmiType: true,
      Note: true,
    }
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await Post(data);
      setOptions(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    modalMode&&setvtype(modalMode); 
     
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleAccountTypeChange = (event) => { setvtype(event.target.value); 
  console.log("vtype",event.target.value);
  };

  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-white' >Create Account </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Form onSubmit={handleSubmit}>

            <>
              <Form.Group className="mb-3" controlId="AccountType">
                <Form.Label>Account Type</Form.Label>
                <Form.Control as="select" name="Actype" 
                required onChange={handleAccountTypeChange}>
                  <option value="SBAC">Saving Account</option>
                  <option value="PLAC">Personal Loan</option>
                  <option value="PGAC">Pigmy Account</option>
                  <option value="SHAC">Share Account</option>
                </Form.Control>
              </Form.Group>
              {GenarateForm[vtype].date && (
                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="Date" />
                </Form.Group>
              )}
              {GenarateForm[vtype].acno && (
                <Form.Group className="mb-3" controlId="formAcno">
                  <Form.Label>Account No</Form.Label>
                  <Form.Control type="text" name="Accountno" readOnly disabled />
                </Form.Group>
              )}
              {GenarateForm[vtype].custspinner && (
                <Form.Group className="mb-3" controlId="formCustomer">
                  <Form.Label>Customer</Form.Label>
                  <Form.Control as="select" name="Customer" required >
                    <option value="" >Select</option>
                    <option value="001" >pavan</option>
                    <option value="002" >siddu</option>
                    <option value="003" >kavan</option>
                  </Form.Control>

                </Form.Group>
              )}
              {GenarateForm[vtype].Roi && (
                <Form.Group className="mb-3" controlId="formRoi">
                  <Form.Label>Rate Of interest %</Form.Label>
                  <Form.Control type="number" name="Roi" />
                </Form.Group>
              )}
              {GenarateForm[vtype].RoiType && (
                <Form.Group className="mb-3" controlId="formRoiType">
                  <Form.Label>Rate Of interest Type</Form.Label>
                  <Form.Control as="select" name="RoiType" required >
                    <option value="year" >Yearly</option>
                    <option value="Month" >Monthly</option>
                  </Form.Control>
                </Form.Group>
              )}
              {GenarateForm[vtype].Duration && (
                <Form.Group className="mb-3" controlId="formDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control type="number" name="Duration" />
                </Form.Group>
              )}
              {GenarateForm[vtype].DurationType && (
                <Form.Group className="mb-3" controlId="formDurationType">
                  <Form.Label>Duration Type</Form.Label>
                  <Form.Control as="select" name="DurationType" required >
                    <option value="Days" >Day's</option>
                    <option value="Weeks" >Week's</option>
                    <option value="Month" >Month's</option>

                  </Form.Control>
                </Form.Group>
              )}
              {GenarateForm[vtype].MaturityDate && (
                <Form.Group className="mb-3" controlId="formMaturityDate">
                  <Form.Label>Maturity Date</Form.Label>
                  <Form.Control type="date" name="MaturityDate" />
                </Form.Group>
              )}
              {GenarateForm[vtype].EmiType && (
                <Form.Group className="mb-3" controlId="formMaturityDate">
                  <Form.Label>EMI Type</Form.Label>
                  <Form.Control as="select" name="DurationType" required >
                    <option value="Days" >Daily</option>
                    <option value="Weeks" >Weekly</option>
                    <option value="Month" >Monthly</option>

                  </Form.Control>
                </Form.Group>
              )}
              {GenarateForm[vtype].Note && (
                <Form.Group className="mb-3" controlId="formNote">
                  <Form.Label>Note</Form.Label>
                  <Form.Control type="text" name="Note" />
                </Form.Group>
              )}
            </>

            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Close</Button>
              <Button variant="success" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AccountRegForm;
