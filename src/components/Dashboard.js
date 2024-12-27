import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Post } from '../api/FetchApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { userInfo } from '../context/userinfo';
import Accordion from 'react-bootstrap/Accordion';


const Dashboard = () => {

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
              <div className="small-box bg-secondary text-center">
                <div className="inner p-2">
                  <h5>{dashboardData.clbal}</h5>
                  <p>Cash Balance</p>
                </div>

              </div>
            </div>


            <div className="col-lg-3 col-6">

              <div className="small-box bg-secondary text-center">
                <div className="inner p-2">
                <h5>{dashboardData.dramt}</h5>
                  <p>Today Receipts</p>
                </div>

              </div>
            </div>

            <div className="col-lg-3 col-6">

              <div className="small-box bg-secondary text-center">
                <div className="inner p-2">
                <h5>{dashboardData.cramt}</h5>
                  <p>Today Payments</p>
                </div>

              </div>
            </div>


            <div className="col-lg-3 col-6">
              <div className="small-box bg-secondary text-center">
                <div className="inner p-2 ">
                <h5>{result.totcustomers}</h5>
                  <p>Total Customers</p>
                </div>

               
              </div>
            </div>

          </div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" >
              <Accordion.Header>Receipt Summary</Accordion.Header>
              <Accordion.Body >
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
                      {drvdata.map((entry, index) => (
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

          <Accordion defaultActiveKey="0" >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Payment Summary</Accordion.Header>
              <Accordion.Body>
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
                      {crvdata.map((entry, index) => (
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
        </Container>
      )}

    </>


  );
};

export default Dashboard;
