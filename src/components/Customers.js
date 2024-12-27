import React, { useState, useEffect } from 'react';
import {  Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Customers.css';
import { useNavigate } from 'react-router-dom'
import CustomerModal from '../utils/CustomerModel'; // Import the reusable modal component
import { Post } from '../api/FetchApi';
import { userInfo } from '../context/userinfo';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('create'); // create or edit
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({
    customer_name: '',
    customer_cell: '',
    customer_address: '',
    customer_email: ''
  });

 // const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  
  const data = {
    apikey: "getCustomer",
    tokenkey: userInfo.token
  }
  const fetchData = async () => {
    try {
      const result = await Post(data);
      setCustomers(result);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  useEffect(() => {

    fetchData();

  }, []);

  const searchHandler = (e) => {
    setSearchText(e.target.value);
  };

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  const handleClose = () => setShow(false);
  const handleShow = (mode, customer = null) => {
    setMode(mode);
    setSelectedCustomer(customer);

    if (mode === 'edit' && customer) {
      setCustomerDetails({
        customer_name: customer.customer_name,
        customer_cell: customer.customer_cell,
        customer_address: customer.customer_address,
        customer_email: customer.customer_email
      });
    } else {
      setCustomerDetails({
        customer_name: '',
        customer_cell: '',
        customer_address: '',
        customer_email: ''
      });
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  function Deletecustomer(cust){
    alert(cust);

   const url = 'https://finbook.softsolin.com/api/delete_customer.php';
   const payload = { 
    customer_id : cust,
    login_code: userInfo.owner_id, 
    shop_id: userInfo.shop_id 
  };
   fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(payload)
  })
  .then(response => response)
  .then(data => {
    console.log('Success:', data);
    setRefresh(!refresh); // Trigger a refresh to update the list
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { 
      ...customerDetails, 
      login_code: userInfo.login_code, 
      shop_id: userInfo.shop_id, 
      owner_id: userInfo.owner_id 
    };

    if (mode === 'edit' && selectedCustomer) {
      payload.customer_id = selectedCustomer.customer_id; // Add customer_id for editing
    }

    const apiEndpoint = mode === 'create' 
      ? 'https://finbook.softsolin.com/api/add_customer.php'
      : 'https://finbook.softsolin.com/api/update_customer.php'; // Replace with your actual API endpoints

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', JSON.stringify(data));
      setCustomerDetails({ customer_name: '', customer_address: '', customer_email: '', customer_cell: '' });
      setShow(false);
      setRefresh(!refresh); // Trigger a refresh to update the list
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.customer_email.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.customer_cell.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.customer_address.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAccountsClick = (customerId) => { 
    navigate(`/home/customers/${customerId}`); };

  const renderCustomerCard = (customer) => (
    <div className="card my-2" key={customer.customer_id}>
      <div className="card-header">
        <div className="card-title">
          <h5>{customer.customer_name}</h5>
        </div>
        <div className="card-tools">
          <button 
            type="button" 
            title="Edit" 
            className="edit-btn btn btn-outline-secondary btn-sm mx-2" 
            aria-label="Edit" 
            onClick={() => handleShow('edit', customer)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" onClick={()=>Deletecustomer(customer.customer_id)}  title="Delete" className="delete-btn btn btn-outline-danger btn-sm mx-2" aria-label="Delete">
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Email: </strong>{customer.customer_email}<br/>
          <strong>Contact: </strong>{customer.customer_cell}<br/>
          <strong>Address: </strong>{customer.customer_address}<br/>
        </p>
      </div>
      <div className="card-footer">
        <button onClick={() => handleAccountsClick(customer.unqid)} className="btn btn-primary ledger-btn">Accounts</button>
      </div>
    </div>
  );

  return (
    <div className='content'>
      <header className='main-header px-3'>
        <h4>Customer's</h4>
      </header>
      <div className="input-group mb-2 px-3">
        <input 
          type="text" 
          onChange={searchHandler} 
          className="form-control" 
          autoComplete="off" 
          aria-autocomplete="none" 
          placeholder="Search by Name or Mobile or Address or Email" 
          value={searchText}
        />
        <Button variant="outline-secondary" id="add" onClick={() => handleShow('create')}>
          <i className="fa-sharp fa-solid fa-user-plus"></i> Add
        </Button>
        <Button variant="outline-secondary" id="refresh" onClick={refreshHandler}>
          <i className="fa-solid fa-arrows-rotate"></i>
        </Button>
      </div>
      <Container className="accounts-container">
        {(!searchText ? customers : filteredCustomers).map(renderCustomerCard)}
      </Container>
      
      <CustomerModal
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        customerDetails={customerDetails}
        mode={mode}
      />
    </div>
  );
};

export default Customers;