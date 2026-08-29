import { RepairRecord } from '../types/customer';
import { formatPhone } from './formatters';

export const printInvoice = (record: RepairRecord): void => {
  const partsTotal =
    record.partsTotal ||
    record.partsReplaced?.reduce((sum, p) => sum + (Number(p.cost) || 0), 0) ||
    0;

  const partsRows =
    record.partsReplaced && record.partsReplaced.length > 0
      ? record.partsReplaced
          .map(
            (part, idx) => `
        <tr>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${idx + 1}</td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${part.name}</td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${(part as any).quantity || 1}</td>
          <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">₹${part.cost}</td>
        </tr>`
          )
          .join('')
      : `
        <tr>
          <td colspan="4" style="padding: 10px; text-align: center; color: #6b7280; font-style: italic;">
            Labor only service (No parts replaced)
          </td>
        </tr>`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Invoice - ${record.jobNumber} - Chaudhari Auto Centre</title>
  <style>
    @page {
      size: A5 portrait;
      margin: 10mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      margin: 0;
      padding: 12px;
      font-size: 12px;
      line-height: 1.4;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #111827;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .garage-name {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .garage-sub {
      font-size: 11px;
      color: #4b5563;
      margin: 2px 0;
    }
    .garage-contact {
      font-size: 10px;
      font-weight: bold;
      color: #1f2937;
      margin: 2px 0;
    }
    .invoice-title {
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 1px;
      text-transform: uppercase;
      background: #f3f4f6;
      display: inline-block;
      padding: 3px 12px;
      border-radius: 4px;
      margin-top: 4px;
    }
    .meta-table {
      width: 100%;
      margin-bottom: 12px;
      border-collapse: collapse;
    }
    .meta-table td {
      vertical-align: top;
      padding: 2px 0;
    }
    .meta-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px;
    }
    .parts-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 11px;
    }
    .parts-table th {
      background: #f3f4f6;
      padding: 6px 8px;
      border-bottom: 1px solid #d1d5db;
      font-weight: bold;
      text-align: left;
    }
    .summary-box {
      margin-left: auto;
      width: 240px;
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 11px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ca8a04;
      padding-top: 6px;
      margin-top: 4px;
      font-size: 14px;
      font-weight: bold;
      color: #14532d;
    }
    .footer {
      margin-top: 24px;
      border-top: 1px dashed #9ca3af;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 10px;
      color: #6b7280;
    }
    .stamp-box {
      text-align: right;
    }
    .stamp-line {
      display: inline-block;
      width: 130px;
      border-top: 1px solid #374151;
      margin-top: 32px;
      text-align: center;
      padding-top: 2px;
      font-weight: bold;
      color: #111827;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="garage-name">CHAUDHARI AUTO CENTRE</h1>
    <div class="garage-sub">Two-Wheeler Multi-Brand Workshop & Genuine Spare Parts</div>
    <div class="garage-sub">Pahur, Pahur Peth, Tal. Jamner, Dist. Jalgaon - 424205</div>
    <div class="garage-contact">Contact: +91 73874 48878 / +91 95038 53143</div>
    <div class="invoice-title">REPAIR INVOICE & JOB CARD</div>
  </div>

  <table class="meta-table">
    <tr>
      <td style="width: 50%; padding-right: 6px;">
        <div class="meta-box">
          <strong style="color: #4b5563; font-size: 10px; text-transform: uppercase;">Customer Details</strong><br />
          <span style="font-size: 13px; font-weight: bold;">${record.customerName}</span><br />
          <span>Mobile: ${formatPhone(record.customerMobile)}</span>
        </div>
      </td>
      <td style="width: 50%; padding-left: 6px;">
        <div class="meta-box">
          <strong style="color: #4b5563; font-size: 10px; text-transform: uppercase;">Invoice Details</strong><br />
          <span>Job Card: <strong>${record.jobNumber}</strong></span><br />
          <span>Date: <strong>${record.repairDate}</strong></span><br />
          <span>Status: <strong>${record.paymentStatus}</strong> (${record.paymentMode || 'Cash'})</span>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top: 6px;">
        <div class="meta-box">
          <strong style="color: #4b5563; font-size: 10px; text-transform: uppercase;">Vehicle & Service Info</strong><br />
          <span>Motorcycle: <strong>${record.bikeBrand || ''} ${record.bikeModel || ''}</strong></span> &bull; 
          <span>Number Plate: <strong style="font-family: monospace;">${record.registrationNumber || 'N/A'}</strong></span>
          ${record.currentKm ? ` &bull; <span>Odometer: <strong>${record.currentKm} KM</strong></span>` : ''}<br />
          <span>Service: <strong>${record.serviceType}</strong></span>
          ${record.mechanicName ? ` &bull; <span>Repaired By: <strong style="color: #b45309;">${record.mechanicName}</strong></span>` : ''}
          ${record.problemDetails ? `<br /><span style="color: #4b5563; font-style: italic;">"${record.problemDetails}"</span>` : ''}
        </div>
      </td>
    </tr>
  </table>

  <strong style="font-size: 11px; text-transform: uppercase;">Replaced Spare Parts & Materials</strong>
  <table class="parts-table">
    <thead>
      <tr>
        <th style="width: 30px; text-align: center;">#</th>
        <th>Description / Part</th>
        <th style="width: 40px; text-align: center;">Qty</th>
        <th style="width: 70px; text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${partsRows}
    </tbody>
  </table>

    ${
      record.servicePrice && record.servicePrice > 0
        ? `
    <div class="summary-row">
      <span>Service Rate (${record.serviceType}):</span>
      <span style="font-family: monospace; font-weight: bold;">₹${record.servicePrice}</span>
    </div>`
        : ''
    }
    <div class="summary-row">
      <span>Spare Parts Total:</span>
      <span style="font-family: monospace; font-weight: bold;">₹${partsTotal}</span>
    </div>
    <div class="summary-row">
      <span>Mechanic Labor Charges:</span>
      <span style="font-family: monospace; font-weight: bold;">₹${record.laborCharge}</span>
    </div>
    ${
      record.discount
        ? `
    <div class="summary-row" style="color: #15803d; font-weight: bold;">
      <span>Discount (Overall Bill):</span>
      <span style="font-family: monospace;">-₹${record.discount}</span>
    </div>`
        : ''
    }
    <div class="total-row">
      <span>Total Amount:</span>
      <span style="font-family: monospace;">₹${record.totalAmount}</span>
    </div>
  </div>

  <div class="footer">
    <div>
      <div>Thank you for choosing Chaudhari Auto Centre!</div>
      <div>Visit again for periodic oil check & servicing.</div>
      ${record.mechanicName ? `<div style="margin-top: 4px; font-weight: bold; color: #374151;">Serviced & Checked by: ${record.mechanicName}</div>` : ''}
    </div>
    <div class="stamp-box">
      <div class="stamp-line">${record.mechanicName ? `${record.mechanicName} / Authorized` : 'Authorized Signatory'}</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
  `;

  const printWindow = window.open('', '_blank', 'width=700,height=800');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    window.print();
  }
};
