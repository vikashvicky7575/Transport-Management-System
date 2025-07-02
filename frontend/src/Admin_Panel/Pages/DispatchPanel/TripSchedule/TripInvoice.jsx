
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from './TripInvoice.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'

const TripInvoice = ({ trip, onClose }) => {
  const invoiceRef = useRef();

  //fetching the dispatcheremail automatically using redux-saga
  const { authUser } = useSelector((state) => state.authStore);

  const handleDownload = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${trip.tripId || 'trip'}_invoice.pdf`);
      onClose();
    });
  };

  if (!trip) return null;

  return (
    <div className={styles.invoiceWrapper} ref={invoiceRef}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.companyBrand}>VIKASH LOGISTICS</div>
        <div className={styles.invoiceLabel}>INVOICE</div>
      </div>

      {/* Info Section */}
      <div className={styles.section}>
        <div className={styles.sectionBox}>
          <strong>Trip Scheduler:</strong><br />
          Dispatcher Name : {trip.dispatcher}<br />
          Phone: {trip.dispatcherMobile || 'N/A'}<br />
          Email: {authUser?.email || 'N/A'}<br />
        </div>
        <div className={styles.sectionBox}>
          <strong>Trip Info:</strong><br />
          Trip ID: {trip.tripId}<br />
          Date: {new Date(trip.startDateTime).toLocaleDateString()}<br />
          Vehicle: {trip.vehicleNumber} ({trip.vehicleType})
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableData}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Driver</td>
              <td>{trip.driverName} ({trip.driverMobileNumber})</td>
            </tr>
            <tr>
              <td>Pickup Location</td>
              <td>{trip.pickupLocation?.name} ({trip.pickupLocation?.coordinates?.join(', ')})</td>
            </tr>
            <tr>
              <td>Drop Location</td>
              <td>{trip.dropLocation?.name} ({trip.dropLocation?.coordinates?.join(', ')})</td>
            </tr>
            <tr>
              <td>Start Date & Time</td>
              <td>{new Date(trip.startDateTime).toLocaleString()}</td>
            </tr>
            <tr>
              <td>Estimated End</td>
              <td>{new Date(trip.estimatedEndDateTime).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className={styles.terms}>
        <strong>Terms & Conditions:</strong> This invoice is computer generated and valid without signature.
      </div>

      <div className={styles.signature}>
        <p>Authorized By,</p>
        <p><strong>Vikash Logistics</strong></p>
      </div>

      <div className={styles.footerNote}>
        THANK YOU FOR YOUR BUSINESS!
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-success" onClick={handleDownload}>Download PDF</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TripInvoice;





