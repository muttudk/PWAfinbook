import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AccountList.css';
import { useNavigate } from 'react-router-dom'
import { Post } from '../api/FetchApi';


const AccountList = () => {
    const { customerId } = useParams();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userinfo'));
    const navigate = useNavigate();

    const data = {
            apikey: "getMemberacs",
            tokenkey: userInfo.token,
            cust_unqid : customerId
          }
          
          const fetchData = async () => {
            try {
              const result = await Post(data);
              setAccounts(result.memberacs);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching dashboard data:', error);
              setLoading(false);
            }
          };
    useEffect(() => {
       
            fetchData();
    }, [customerId]);

    const filteredAccounts = accounts.filter(Accounts =>
        Accounts.account_type_name.toLowerCase().includes(searchText.toLowerCase()) ||
        Accounts.account_type_code.toLowerCase().includes(searchText.toLowerCase())
    );
    const searchHandler = (e) => {
        setSearchText(e.target.value);
      };
      
      const handleLedgerClick = (accountId) => 
        { navigate(`/home/ledger/${accountId}`); };

    const renderAccountsCard = (Accounts) => (
        <div className="card my-2 " key={Accounts.unqid}>
            <div className="card-header">
                <div className="card-title">
                    <h5>{Accounts.account_type_name}</h5>
                </div>
      
            </div>
            <div className="card-body">
                <p className="card-text">
                    <strong>Name: </strong>{Accounts.customer_name}<br />
                    <strong>Type: </strong>{Accounts.account_type_code}<br />
                    <strong>Open Date: </strong>{Accounts.open_date}<br />
                    <strong>Maturity Date: </strong>{Accounts.maturity_date}<br />
                    <strong>Balance:</strong>{Accounts.clbal}<br />
                </p>
            </div>
            <div className="card-footer">
                <button onClick={() => handleLedgerClick(Accounts.unqid)}  className="btn btn-primary ledger-btn">Ledger</button>
            </div>
        </div>
    );

    return (

        <>
            {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ): (
                <div className='content'>
                    <header className='main-header px-3'>
                        <h4>{(!accounts.length === 0)&&accounts.at(0).customer_name}Account's</h4>
                    </header>
                    <div className="input-group mb-2 px-4">
                        <input
                            type="text"
                            onChange={searchHandler}
                            className="form-control"
                            autoComplete="off"
                            aria-autocomplete="none"
                            placeholder="Search by Account Type or Name "
                            value={searchText}
                        />

                        <Button variant="outline-secondary" id="add" disabled>
                            <i className="fa-sharp fa-solid fa-user-plus"></i> Account
                        </Button>

                        <Button variant="outline-secondary" id="refresh" >
                            <i className="fa-solid fa-arrows-rotate"></i> 
                        </Button>

                    </div>
                    <Container className="accounts-container">
                        {(!searchText ? accounts : filteredAccounts).map(renderAccountsCard)}
                    </Container>

                    {/* <CustomerModal
                show={show}
                handleClose={handleClose}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                customerDetails={customerDetails}
                mode={mode}
            /> */}
                </div>
            )}

        </>

    );
};

export default AccountList;
