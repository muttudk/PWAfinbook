import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DynamicModal from '../utils/DynamicModel';
import useModal from '../utils/useModel';
import './LedgerAccount.css';
import { Post } from '../api/FetchApi';
import { formatDate, getCurrentTimeFormatted } from '../utils/DateString';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import AccountRegForm from '../utils/AccountRegForm';

const LedgerAccount = () => {
  const { accountId } = useParams();
  const [ledger, setLedger] = useState([]);
  const [ledgerhead, setledgerhead] = useState({});
  const [loading, setLoading] = useState(true);
 // const [accounts, setAccounts] = useState([]);
  const { isVisible, modalData, modalMode, openModal, closeModal } = useModal();
  const userInfo = JSON.parse(localStorage.getItem('userinfo'));
  const [data, setdata] = useState({
    apikey: "getGenledger",
    tokenkey: userInfo.token,
    account_id: accountId,
    fdate: new Date().toLocaleDateString('en-IN').replaceAll('/', '-'),
    tdate: new Date().toLocaleDateString('en-IN').replaceAll('/', '-')
  });

  const fetchData = useCallback(async () => {
    try {
      const result = await Post(data);
      setLoading(false);
      setLedger(result.ldgdet);
      setledgerhead(result.ldghead);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching dashboard data:', error);
    }
  }, [data]);

  useEffect(() => {
    accountId && fetchData();
  }, [accountId, data.fdate, data.tdate, fetchData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setdata({
      ...data,
      fdate: (formData.get('fromDate') ? formatDate(formData.get('fromDate')) : data.fdate),
      tdate: (formData.get('toDate') ? formatDate(formData.get('toDate')) : data.tdate)
    });
    closeModal();
  };

  const doc = new jsPDF();

  const printorsave = (type) => {
    doc.setFontSize(14);
    doc.text("Ledger", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Account Code  : ${ledgerhead.ac_code}`, 10, 25);
    doc.text(`Account Group : ${ledgerhead.ac_group_code}`, 10, 32);
    doc.text(`from Date : ${data.fdate} To Date : ${data.tdate}`, 10, 39);

    doc.autoTable({
      theme: 'grid',
      columnStyles: { 4: { halign: 'right' }, 5: { halign: 'right' } },
      html: "#report_data",
      startY: 45,
      margin: { top: 10, left: 10, right: 10 },
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
    }

    if (type === "print") {
      window.open(doc.output("bloburl"), "_blank");
    } else if (type === "download") {
      doc.save(`${ledgerhead.ac_code}_Ledger_${getCurrentTimeFormatted()}.pdf`);
    }
  };

  return (
    <Container className="ledger-account-container">
      <div className='ledger-header'>
        <h2>Ledger</h2>
        <div className='header-btns'>
        
          <Button variant="px-4 mx-2 text-black" onClick={() => openModal({},'filter')}><i className="fa-regular fa-calendar-check text-black"></i> Filter</Button>
          <Button variant="px-4 mx-2 text-black" onClick={() => printorsave("print")}><i className="fa-solid fa-print text-black"></i> Print</Button>
          <Button variant="px-4 mx-2 text-black" onClick={() => printorsave("download")}><i className="fa-solid fa-download text-black"></i></Button>
        </div>

      </div>
      <div>
        <h6>Account Code  : {ledgerhead.ac_code}</h6>
        <h6>Account Group : {ledgerhead.ac_group_code}</h6>
        <h6>from Date : {data.fdate}</h6>
        <h6>To Date : {data.tdate}</h6>
      </div>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className='ledger-table'>
          <Table id="report_data" striped bordered hover>
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
            <tbody className='ledger-body'>
              {ledger.map((entry, index) => (
                <tr key={entry.voucher_unqid}>
                  <td>{index + 1}</td>
                  <td>{entry.voucher_name}</td>
                  <td>{entry.voucher_date}</td>
                  <td>{entry.account_desc}</td>
                  <td>{entry.voucher_amount}</td>
                  <td>{entry.clbal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <DynamicModal
        isVisible={isVisible}
        handleClose={closeModal}
        modalData={modalData}
        modalMode={modalMode}
        handleSubmit={handleSubmit}
      />
      
    </Container>
  );
};

export default LedgerAccount;
