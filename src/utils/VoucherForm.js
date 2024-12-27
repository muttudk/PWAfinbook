import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const VoucherModel = ({ show, handleClose, handleChange, handleSubmit, voucherData, mode, accounts }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'credit' ? 'Credit Voucher' : 'Debit Voucher'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formVoucherDate">
            <Form.Label>Voucher Date</Form.Label>
            <Form.Control
              type="date"
              name="voucher_date"
              value={voucherData.voucher_date}
              onChange={handleChange}
              placeholder="Enter voucher date"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRefNo">
            <Form.Label>Ref No</Form.Label>
            <Form.Control
              type="text"
              name="Ref_no"
              value={voucherData.Ref_no}
              onChange={handleChange}
              placeholder="Enter reference number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="Amount"
              value={voucherData.Amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAccount">
            <Form.Label>Account</Form.Label>
            <Form.Control
              as="select"
              name="Account"
              value={voucherData.Account}
              onChange={handleChange}
            >
              <option value="">Select Account</option>
              {accounts.map(account => (
                <option key={account.account_id} value={account.account_id}>{account.account_name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              name="remarks"
              value={voucherData.remarks}
              onChange={handleChange}
              rows={3}
              placeholder="Enter remarks"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VoucherModel;
