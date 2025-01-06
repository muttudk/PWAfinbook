import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Post } from '../api/FetchApi';

const DynamicModal = ({ isVisible, handleClose, modalData, modalMode, handleSubmit, vtype }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const [usertype, setusertype] = useState(null);

  const data = {
    apikey: "getpopLdgmast",
    tokenkey: userInfo.token,
  }

  const formType ='SBAC';
  
  const GenarateForm = {
    PLAC : {
      date : true,
      acno : true,
      custspinner : true,
      Roi : true,
      RoiType : true,
      Duration : true,
      DurationType : true,
      MaturityDate : true,
      EmiType : true,
      Note : true,  
    },
    SBAC : {
      date : true,
      acno : true,
      custspinner : true,
      Roi : true,
      RoiType : true,
      Duration : false,
      DurationType : false,
      MaturityDate : false,
      EmiType : false,
      Note : true,  
    },
    SHAC : {
      date : true,
      acno : true,
      custspinner : true,
      Roi : true,
      RoiType : true,
      Duration : false,
      DurationType : false,
      MaturityDate : false,
      EmiType : false,
      Note : true,  
    },
    PGAC:{
      date : true,
      acno : true,
      custspinner : true,
      Roi : true,
      RoiType : true,
      Duration : true,
      DurationType : true,
      MaturityDate : true,
      EmiType : true,
      Note : true,  
    }
  }

  const fetchData = async () => {
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
    userInfo && setusertype(userInfo.user_type);
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header closeButton className={vtype&&vtype === 'CRVCH' ? "bg-success" : "bg-danger"}>
        <Modal.Title className='text-white' >{modalMode === 'voucher' ? vtype === 'CRVCH' ? "Recipt Voucher" : 'Payment Voucher' : `Create ${formType}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Form onSubmit={handleSubmit}>
            {modalMode === 'voucher' && (
              <>
                <Form.Group className="mb-3" controlId="formVoucherDate">
                  <Form.Label>Voucher Date</Form.Label>
                  <Form.Control type="date" name="voucher_date" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRefNo">
                  <Form.Label>Ref No</Form.Label>
                  <Form.Control type="text" name="voucher_no" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formOthac_code">
                  <Form.Label>Account</Form.Label>

                  {
                    usertype === 'admin' && <Form.Control as="select" name="othac_code" required >
                      <option value="" >Select</option>
                      {options.map(account => (
                        <option key={account.code} value={account.name}>{account.name}_{account.grpname}</option>
                      ))}
                    </Form.Control>

                  }
                  {
                    usertype === 'agent' && <Form.Control as="select" name="othac_code" required >
                      <option value="" >Select</option>
                      {options.map(account => (
                        <option key={account.code} value={account.name}>{account.name}_{account.grpname}</option>
                      ))}
                    </Form.Control>

                  }
                 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" name="voucher_amount" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRemarks">
                  <Form.Label>Remarks</Form.Label>
                  <Form.Control as="textarea" name="voucher_note" rows={2} />
                </Form.Group>
                <Form.Group className="mb-3" hidden controlId="formVocheracid">
                  <Form.Label>voucher_ac_id</Form.Label>
                  <Form.Control type="text" name="voucher_ac_id" value={modalData.unqid} readOnly required />
                </Form.Group>            
                <Form.Group className="mb-3" hidden controlId="formvouchername">
                  <Form.Control type="text" name="voucher_name" defaultValue={vtype} />
                </Form.Group>
              </>
            )}
            {modalMode === 'filter' && (
              <>
                <Form.Group className="mb-3" controlId="formAccount">
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFromDate">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control type="date" name="fromDate" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formToDate">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control type="date" name="toDate" />
                </Form.Group>
              </>
            )}
              {modalMode === 'Account' && (
              <>
              {GenarateForm[formType].date && (
                <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="Date" />
              </Form.Group>
              )}
                {GenarateForm[formType].acno && (
                <Form.Group className="mb-3" controlId="formAcno">
                <Form.Label>Account No</Form.Label>
                <Form.Control type="text" name="Accountno" readOnly disabled />
              </Form.Group>
              )}
                   {GenarateForm[formType].custspinner && (
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
               {GenarateForm[formType].Roi && (
                <Form.Group className="mb-3" controlId="formRoi">
                <Form.Label>Rate Of interest %</Form.Label>
                <Form.Control type="number" name="Roi"   />
              </Form.Group>
              )}
               {GenarateForm[formType].RoiType && (
                <Form.Group className="mb-3" controlId="formRoiType">
                <Form.Label>Rate Of interest Type</Form.Label>
                <Form.Control as="select" name="RoiType" required >
                     <option value="year" >Yearly</option>
                     <option value="Month" >Monthly</option>  
                   </Form.Control>
              </Form.Group>
              )}
               {GenarateForm[formType].Duration && (
                <Form.Group className="mb-3" controlId="formDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control type="number" name="Duration"   />
              </Form.Group>
              )}
               {GenarateForm[formType].DurationType && (
                <Form.Group className="mb-3" controlId="formDurationType">
                <Form.Label>Duration Type</Form.Label>
                <Form.Control as="select" name="DurationType" required >
                     <option value="Days" >Day's</option>
                     <option value="Weeks" >Week's</option>
                     <option value="Month" >Month's</option>
                    
                   </Form.Control>
              </Form.Group>
              )}
                {GenarateForm[formType].MaturityDate && (
                <Form.Group className="mb-3" controlId="formMaturityDate">
                <Form.Label>Maturity Date</Form.Label>
                <Form.Control type="date" name="MaturityDate" />
              </Form.Group>
              )}
              {GenarateForm[formType].EmiType && (
                <Form.Group className="mb-3" controlId="formMaturityDate">
                <Form.Label>EMI Type</Form.Label>
                <Form.Control as="select" name="DurationType" required >
                     <option value="Days" >Daily</option>
                     <option value="Weeks" >Weekly</option>
                     <option value="Month" >Monthly</option>
                    
                   </Form.Control>
              </Form.Group>
              )}
               {GenarateForm[formType].Note && (
                <Form.Group className="mb-3" controlId="formNote">
                <Form.Label>Note</Form.Label>
                <Form.Control type="text" name="Note" />
              </Form.Group>
              )}
              </>   
            )}
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

export default DynamicModal;
