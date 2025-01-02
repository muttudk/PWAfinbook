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
      <Modal.Header closeButton className={vtype === 'CRVCH' ? "bg-success" : "bg-danger"}>
        <Modal.Title className='text-white' >{modalMode === 'voucher' ? vtype === 'CRVCH' ? "Recipt Voucher" : 'Payment Voucher' : 'Filter'}</Modal.Title>
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
                {/* <Form.Group className="mb-3" hidden controlId="formvoucherdrorcr">
                  <Form.Label>voucher_drorcr</Form.Label>
                  <Form.Control type="number" name="voucher_drorcr"  defaultValue="1"/>
                </Form.Group> */}
                <Form.Group className="mb-3" hidden controlId="formvouchername">
                  <Form.Control type="text" name="voucher_name" defaultValue={vtype} />
                </Form.Group>
              </>
            )}
            {modalMode === 'filter' && (
              <>
                <Form.Group className="mb-3" controlId="formAccount">
                  {/* <Form.Label>Account</Form.Label>
                  <Form.Control as="select" name="account" >
                    <option value="">Select Account</option>
                    {options.map(account => (
                      <option key={account.code} value={account.name}>{account.name}_{account.grpname}</option>
                    ))}
                  </Form.Control> */}
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
