import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DynamicModal from '../utils/DynamicModel';
import useModal from '../utils/useModel';
import './LedgerAccount.css';
import { userInfo } from '../context/userinfo';
import { Post } from '../api/FetchApi';


const LedgerAccount = () => {
  const { accountId } = useParams();
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const { isVisible, modalData, modalMode, openModal, closeModal } = useModal();
  //const userInfo = JSON.parse(localStorage.getItem('userinfo'));

   const data = {
     apikey: "getGenledger",
     tokenkey: userInfo.token,
     account_id: accountId
   }
   const fetchData = async () => {
     try {
       const result = await Post(data);
          setLoading(false);
          setLedger(result.ldgdet);
     } catch (error) {
      setLoading(false);
      console.error('Error fetching dashboard data:', error);
     }
   };
  
  useEffect(() => {
   
    fetchData();
  }, [accountId]);

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    console.log(e.target.elements); 
    closeModal(); 
  };
  
  return (
    <Container className="ledger-account-container">
      <div className='ledger-header'>
      <h2>Ledger</h2>
      <div className='header-btns'>
       <Button variant="primary px-2 mx-2" onClick={() => openModal({ accounts }, 'voucher')}>Voucher</Button> 
       <Button variant="secondary px-2 mx-2" onClick={() => openModal({ accounts }, 'filter')}>Open Filter</Button>
      
      </div>
      </div>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Serial #</th>
              <th>Voucher</th>
              <th>Date</th>
              <th>Particular</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((entry, index) => (
              <tr key={entry.voucher_unqid}>
                <td>{index + 1}</td>
                <td>{entry.voucher_name}</td>
                <td>{entry.voucher_date}</td>
                <td>{entry.autoremarks}</td>
                <td>{entry.voucher_amount}</td>
                <td>{entry.clbal}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    <DynamicModal isVisible={isVisible} 
    handleClose={closeModal} 
    modalData={modalData} 
    modalMode={modalMode} 
    handleSubmit={handleSubmit} 
    /> 
     
    </Container>
  );
};

export default LedgerAccount;
