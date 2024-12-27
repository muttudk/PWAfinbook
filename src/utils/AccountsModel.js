import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountsModel = ({ show, handleClose, handleChange, handleSubmit, customerDetails, mode }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'create' ? 'Add Customer' : 'Edit Customer'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCustomerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              value={customerDetails.customer_name}
              onChange={handleChange}
              placeholder="Enter customer name"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCustomerEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="customer_email"
              value={customerDetails.customer_email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCustomerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="customer_cell"
              value={customerDetails.customer_cell}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCustomerAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="customer_address"
              value={customerDetails.customer_address}
              onChange={handleChange}
              rows={3}
              placeholder="Enter address"
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

export default AccountsModel;
