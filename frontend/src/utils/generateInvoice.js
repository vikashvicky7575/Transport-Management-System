import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoice = (trip) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Trip Invoice', 105, 15, null, null, 'center');

  doc.setFontSize(12);
  doc.text(`Trip ID: ${trip.tripId}`, 14, 30);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
  doc.text(`Dispatcher: ${trip.dispatcher}`, 14, 46);

  doc.autoTable({
    startY: 55,
    head: [['Details', 'Information']],
    body: [
      ['Vehicle Number', trip.vehicleNumber],
      ['Vehicle Type', trip.vehicleType],
      ['Driver Name', trip.driverName],
      ['Driver Mobile', trip.driverMobileNumber],
      ['Pickup Location', trip.pickupLocation],
      ['Drop Location', trip.dropLocation],
      ['Start Date & Time', new Date(trip.startDateTime).toLocaleString()],
      ['Estimated End Date & Time', new Date(trip.estimatedEndDateTime).toLocaleString()],
      ['Trip Status', trip.status || 'Scheduled'],
    ],
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 11, cellPadding: 4 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  doc.save(`Invoice-${trip.tripId}.pdf`);
};
