import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { Post } from '../api/FetchApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

import Accordion from 'react-bootstrap/Accordion';


const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [crvdata, setcrvdata] = useState([]);
  const [drvdata, setdrvdata] = useState([]);
  const [result, setresult] = useState([]);

  const data = {
    apikey: "getDashboard",
    tokenkey: userInfo.token,
    ason: new Date().toLocaleDateString('en-IN').replaceAll('/', '-'),
  }
  const fetchData = async () => {
    try {
      const result = await Post(data);
      setDashboardData(result.cashinfo);
      setresult(result);
      setdrvdata(result.totaldrvch);
      setcrvdata(result.totalcrvch);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (<h3>Loading...</h3>) : (
        <Container className="dashboard-container mt-4 ">

          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info text-center">
                <div className="inner p-2">
                  <h5 className='text-white'>{dashboardData ? dashboardData.clbal : "N/A"}</h5>
                  <p className='text-white fw-bold'>Cash <br/>Balance</p>
                </div>

              </div>
            </div>


            <div className="col-lg-3 col-6">

              <div className="small-box bg-success text-center">
                <div className="inner p-2">
                  <h5 className='text-white'>{dashboardData ? dashboardData.dramt : "N/A"}</h5>
                  <p className='text-white fw-bold'>Today <br/>Receipts</p>
                </div>

              </div>
            </div>

            <div className="col-lg-3 col-6">

              <div className="small-box bg-danger text-center">
                <div className="inner p-2">
                  <h5 className='text-white'>{dashboardData ? dashboardData.cramt : "N/A"}</h5>
                  <p className='text-white fw-bold'>Today <br/>Payments</p>
                </div>

              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-white text-center">
                <div className="inner p-2 ">
                  <h5>{result.totcustomers}</h5>
                  <p className='fw-bold'>Total <br/> Customers</p>
                </div>
              </div>
            </div>

          </div>
          <div>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12 mt-3">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0" >
                    <Accordion.Header>Receipt Summary</Accordion.Header>
                    <Accordion.Body className='custom-accordion-body p-0'>
                      {loading ? (
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : (
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Sl No.</th>
                              <th>Description</th>
                              <th>No of Voucher's</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drvdata && drvdata.map((entry, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.account_desc}</td>
                                <td>{entry.noofrecs}</td>
                                <td>{entry.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <Accordion defaultActiveKey="0" className='mt-3'>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header >Payment Summary</Accordion.Header>
                    <Accordion.Body className='custom-accordion-body p-0'>
                      {loading ? (
                        <div className="loading-spinner">Loading...</div>
                      ) : (
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Sl No.</th>
                              <th>Description</th>
                              <th>No of Voucher's</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {crvdata && crvdata.map((entry, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.account_desc}</td>
                                <td>{entry.noofrecs}</td>
                                <td>{entry.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
