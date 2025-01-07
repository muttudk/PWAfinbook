import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddaccountPOST, Post } from '../api/FetchApi';
import { formatDate } from './DateString';
import Tosty from '../utils/Tosty';


const AccountRegForm = ({ isVisible, handleClose, modalMode,showtoast }) => {

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const [usertype, setusertype] = useState(null);
  const [vtype, setvtype] = useState(null);
  const [today, setToday] = useState('');
  const [acgrptype, setAcgrptype] = useState(JSON.parse(localStorage.getItem('acgrptype')));

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
    const data = {
      apikey: "getCustomer",
      tokenkey: userInfo.token,
    }
    try {
      const result = await Post(data);
      setOptions(result);
      console.log("result", result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      apikey: "updateCustacmast",
      tokenkey: userInfo.token,
      data: {
        "account_id": null,
        "unqid": "",
        "customer_unqid": formData.get('Customer'),
        "actype_unqid": vtype
          ? acgrptype.find(actype => actype.account_type_code === vtype)?.account_type_unqid
          : null,
        "ac_code": "",
        "customer_name": vtype
        ? options.find(options => options.unqid === formData.get('Customer'))?.customer_name
        : null,
        "open_date": formatDate(formData.get('formDate')),
        "rateofins": formData.get('Roi'),
        "roitype": formData.get('RoiType'),
        "no_of_emi": formData.get('Duration'),
        "periodtyp": formData.get('DurationType'),
        "maturity_date": null,
        "emimode": formData.get('EmiType'),
        "remarks": formData.get('Note')
      }
    }
        try {
              await AddaccountPOST(data)
              .then((data) => {
                if (data.status === "success") {
                  showtoast({status:data.status ,message:data.message});
                  resetForm();
                }
                else {
                  showtoast({status:data.status,message:data.message});
                  
                }
            })
            
            } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
            }

   // console.log(data);
  // showtoast({status:"failuer" ,message:"Hello Siddu"});
   
  };



  const resetForm = () => {
    setvtype("");
    document.getElementById('AcForm').reset();
    handleClose();
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setToday(currentDate);
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleAccountTypeChange = (event) => {
    const selectedValue = event.target.value;
    setvtype(selectedValue);
  
    // Disable the account type dropdown after selection
    if (selectedValue) {
      const dropdown = document.getElementById("AccountType");
      if (dropdown) dropdown.disabled = true;
  
      // Reset the form but preserve the account type selection
      const form = document.getElementById("AcForm");
      if (form) {
        Array.from(form.elements).forEach((element) => {
          if (element.name !== "Acgrptype") {
            element.value = ""; // Clear all fields except the account type
          }
        });
      }
    }
  };
  return (
    <Modal show={isVisible} onHide={resetForm} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className='bg-primary'>
        <Modal.Title className='text-white' >New Account </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Form.Group className="mb-3" controlId="AccountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control as="select" name="Acgrptype" required onChange={handleAccountTypeChange}>
                <option value="">Select Account Type</option>
                {acgrptype.map((option) => (
                  <option key={option.account_type_code} value={option.account_type_code}>
                    {option.account_type_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form id="AcForm" onSubmit={handleSubmit}>
              <>
                {vtype && GenarateForm[vtype].date && (
                  <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="formDate" defaultValue={today} />
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].acno && (
                  <Form.Group className="mb-3" controlId="formAcno">
                    <Form.Label>Account No</Form.Label>
                    <Form.Control type="text" name="Accountno" readOnly disabled />
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype]?.custspinner && (
                  <Form.Group className="mb-3" controlId="formCustomer">
                    <Form.Label>Customer</Form.Label> <Form.Control as="select" name="Customer" required>
                      <option key="" value=''>Select</option>
                      {options.map((option) => (
                        <option key={option.unqid} value={option.unqid}> {option.customer_name} </option>))}
                    </Form.Control>
                  </Form.Group>)}
                {vtype && GenarateForm[vtype].Roi && (
                  <Form.Group className="mb-3" controlId="formRoi">
                    <Form.Label>Rate Of interest %</Form.Label>
                    <Form.Control type="number" name="Roi" />
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].RoiType && (
                  <Form.Group className="mb-3" controlId="formRoiType">
                    <Form.Label>Rate Of interest Type</Form.Label>
                    <Form.Control as="select" name="RoiType" required >
                      <option value="0" >Yearly</option>
                      <option value="1" >Monthly</option>
                    </Form.Control>
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].Duration && (
                  <Form.Group className="mb-3" controlId="formDuration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="number" name="Duration" />
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].DurationType && (
                  <Form.Group className="mb-3" controlId="formDurationType">
                    <Form.Label>Duration Type</Form.Label>
                    <Form.Control as="select" name="DurationType" required >
                      <option value="0" >Day's</option>
                      <option value="1" >Week's</option>
                      <option value="2" >Month's</option>

                    </Form.Control>
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].MaturityDate && (
                  <Form.Group className="mb-3" controlId="formMaturityDate">
                    <Form.Label>Maturity Date</Form.Label>
                    <Form.Control type="text" name="MaturityDate" readOnly disabled/>
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].EmiType && (
                  <Form.Group className="mb-3" controlId="formMaturityDate">
                    <Form.Label>EMI Type</Form.Label>
                    <Form.Control as="select" name="EmiType" required >
                      <option value="0" >Daily</option>
                      <option value="1" >Weekly</option>
                      <option value="2" >Monthly</option>

                    </Form.Control>
                  </Form.Group>
                )}
                {vtype && GenarateForm[vtype].Note && (
                  <Form.Group className="mb-3" controlId="formNote">
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text" name="Note" />
                  </Form.Group>
                )}
              </>
              {vtype && (
                <Modal.Footer>
                  <Button variant="primary" onClick={resetForm}>Close</Button>
                  <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
              )}

            </Form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AccountRegForm;
