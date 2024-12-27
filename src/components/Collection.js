
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AccountList.css';
import { useNavigate } from 'react-router-dom';
import DynamicModal from '../utils/DynamicModel';
import useModal from '../utils/useModel';
import { formatDate, getCurrentTimeFormatted } from '../utils/DateString';
import Tosty from '../utils/Tosty';
import { Post, updateVoucher } from '../api/FetchApi';
import { userInfo } from '../context/userinfo';


const Collection = () => {
  const [accounts, setAccounts] = useState([]);
  //const [options, setoptions] = useState([]);
  const [toastStatus, setToastStatus] = useState(null); 
  const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const { isVisible, modalData, modalMode, openModal, closeModal } = useModal();
  
    const navigate = useNavigate();


    
    
   

const data = {
        apikey: "getMemberacs",
        tokenkey: userInfo.token
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
       
    },[]);
    
   
    const filteredAccounts = accounts.filter(Accounts =>
        Accounts.account_type_name.toLowerCase().includes(searchText.toLowerCase()) ||
        Accounts.account_type_code.toLowerCase().includes(searchText.toLowerCase()) ||
        Accounts.customer_name.toLowerCase().includes(searchText.toLowerCase())
    );
    const searchHandler = (e) => {
        setSearchText(e.target.value);
      };
      
      const handleLedgerClick = (accountId) => 
        { navigate(`/home/ledger/${accountId}`); };

    const renderAccountsCard = (Accounts) => (
        <div className="card my-2 " key={Accounts.unqid}>
            <div className="card-header">
                <div className="card-title ">
                    <h5>{Accounts.account_type_name}</h5>
                </div>
      
            </div>
            <div className="card-body">
                <p className="card-text">
                    <strong>Name : </strong>{Accounts.customer_name}<br />
                    <strong>Type : </strong>{Accounts.account_type_code}<br />
                    <strong>Open Date : </strong>{Accounts.open_date}<br />
                    <strong>Maturity Date : </strong>{Accounts.maturity_date}<br />
                    <strong>Balance :</strong>{Accounts.clbal}<br />
                </p>
            </div>

            <div className="card-footer">
                <Button variant="outline-success" className="px-2 mx-3" onClick={() => openModal( Accounts , 'voucher')}>Receipt</Button> 
                <Button disabled variant="outline-danger" className="px-2 mx-3" onClick={() => openModal( {Accounts} , 'voucher')}>Payment</Button> 
                <Button variant="outline-info"  className="px-2 mx-3" onClick={() => handleLedgerClick(Accounts.unqid)} >Ledger</Button>
            </div>
        </div>
    );


    const handleSubmit = (e) => { 
      e.preventDefault(); 
      const formData = new FormData(e.target); 
      const data1 = { 
        voucher_type :"4",
        voucher_id: null,
        voucher_name:"CRVCH",
        othac_code:formData.get('othac_code'),
        voucher_amount:formData.get('voucher_amount'),
        voucher_no: formData.get('voucher_no'),  
        voucher_note: formData.get('voucher_note'),
       // voucher_time:getCurrentTimeFormatted(),  
        voucher_othac_cd: "",
        voucher_ac_id:formData.get('voucher_ac_id'),
        voucher_date: formatDate(formData.get('voucher_date')), 
       // shop_id:userInfo.shop_id,
    };
   
    
    const avoucher = {
        apikey: "updateVoucher",
        tokenkey: userInfo.token,
        data:data1
      }
      console.log(avoucher);
      
      const Addvoucher = async () => {
        try {
          await updateVoucher(avoucher)
          .then((data) => {

            if (data.status === "success") {
                fetchData();
                setToastStatus(data.message); 
                setToastMessage("Voucher added successfully!");
                closeModal();
            }
            else {
                setToastStatus(data.message); 
                setToastMessage(data.message);
                closeModal();
            }
        })
        
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          setLoading(false);
        }
      };
      Addvoucher();

    // fetch(`https://finbook.softsolin.com/api/add_voucher.php?`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded', // URL-encoded data
    //     },
    //     body: new URLSearchParams(data), // Converts formData to URL-encoded format
    // })
    //     .then((response) => response.json())
    //     .then((data) => {

    //         if (data.value === "success") {
    //             fetchData();
    //             setToastStatus(data.value); 
    //             setToastMessage("Voucher added successfully!");
    //             closeModal();
    //         }
    //         else {
    //             setToastStatus(data.value); 
    //             setToastMessage("Transaction Failed...");
    //             closeModal();
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         closeModal();
    //     });
  };
  const clearToast = () => { 
    setToastStatus(null); 
    setToastMessage(''); };

    return (

        <>
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <div className='content'>
                    <header className='main-header px-3'>
                        <h4>Collection</h4>
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

                        <Button variant="outline-secondary" id="refresh" onClick={()=>(fetchData())}> 
                            <i className="fa-solid fa-arrows-rotate"></i> 
                        </Button>

                    </div>
                    <Container className="accounts-container">
                        {(!searchText ? accounts : filteredAccounts).map(renderAccountsCard)}
                    </Container>
                    <DynamicModal isVisible={isVisible}
                        handleClose={closeModal}
                        modalData={modalData}
                        modalMode={modalMode}
                        handleSubmit={handleSubmit}
                       // options={options}
                    />
                </div>
                
                
            )}
             <Tosty status={toastStatus} message={toastMessage} clearToast={clearToast} />
        </>

    );
};

export default Collection

