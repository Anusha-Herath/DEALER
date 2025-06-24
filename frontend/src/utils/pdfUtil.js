import jsPDF from "jspdf";
import letterHead from "../assets/images/letterHead.png";
import "jspdf-autotable";
import html2pdf from "html2pdf.js";

export const generatePDF = (columns, data, title) => {
  const doc = new jsPDF();

  // Add letterhead image
  doc.addImage(letterHead, "PNG", 12, 0, 185, 30);

  // Add title
  doc.setFontSize(25);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 40);

  // Add a subtitle or description
  doc.setFontSize(11);
  doc.text("Created on: " + new Date().toLocaleDateString(), 14, 50);

  // Add a horizontal line
  doc.setLineWidth(0.5);
  doc.line(14, 52, 200, 52);

  // Calculate column widths dynamically
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14; // Left and right margin
  const tableWidth = pageWidth - margin * 2;
  const columnWidth = tableWidth / columns.length;

  // Add table headers
  let startY = 60;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  columns.forEach((col, index) => {
    const x = margin + index * columnWidth;
    doc.text(col, x, startY, { maxWidth: columnWidth });
  });

  // Add table rows
  doc.setFont("helvetica", "normal");
  data.forEach((row) => {
    startY += 10; // Move to the next row
    if (startY > doc.internal.pageSize.getHeight() - 20) {
      // Add a new page if the content exceeds the page height
      doc.addPage();
      startY = 20; // Reset startY for the new page
      // Re-add table headers on the new page
      doc.setFont("helvetica", "bold");
      columns.forEach((col, index) => {
        const x = margin + index * columnWidth;
        doc.text(col, x, startY, { maxWidth: columnWidth });
      });
      startY += 10; // Move to the next row after headers
      doc.setFont("helvetica", "normal");
    }
    columns.forEach((col, colIndex) => {
      const cellData = row[col] || "N/A";
      const x = margin + colIndex * columnWidth;
      doc.text(cellData.toString(), x, startY, { maxWidth: columnWidth });
    });
  });

  // Save the PDF
  doc.save(`${title}.pdf`);
};

// generating single data report docx
export function getReportHtml(rowData) {
  // Product Eligibility
  if ("Product" in rowData || "PRODUCT" in rowData) {
    return `
      <div style="max-width: 800px; margin: 0 0; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);, sans-serif;">

      <img 
        src=${letterHead} 
        alt="letter head"
        style="display: block; max-width: 100%; height: auto; border-radius: 8px; margin: 0px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);" 
      />

      <h2 style="margin-bottom: 24px; font-size: 24px;"><strong>PRODUCT ELIGIBILITY:</strong>  TARIFF ID(${rowData["Tariff ID"]}) DETAILS</h2>

      <div style="margin-bottom: 20px;">
        <h5 style="border-bottom: 2px solid #0d6efd; padding-bottom: 8px; margin-bottom: 20px; font-weight: bold; color: #0d6efd; font-size: 18px;">BENEFICIARY DATA REPORT</h5>
        <p style="font-size: 14px; line-height: 1.5; text-align: justify; color: #333;">
          A Beneficiary Data Report must be completed once a year to report the racial/ethnic category of participants enrolled in your center.
          Determine the participant’s racial/ethnic category visually using your best judgement.
          A participant may be included in the category to which he or she appears to belong, identifies with, or is regarded as a member by the community.
        </p>
      </div>

      <div style="margin-bottom: 20px;">
        <h5 style="border-bottom: 2px solid #0d6efd; padding-bottom: 8px; margin-bottom: 20px; font-weight: bold; color: #0d6efd; font-size: 18px;">RULE INFORMATIONS</h5>
        <div><span style="font-weight: 500;">TARIFF ID :</span> <span style="font-weight: bold; color: #333;">${rowData["Tariff ID"]}</span></div>
        <div><span style="font-weight: 500;">PRODUCT :</span> <span style="font-weight: bold; color: #333;">${rowData["Product"]}</span></div>
        <div><span style="font-weight: 500;">SALES TYPE :</span> <span style="font-weight: bold; color: #333;">${rowData["Sales type"]}</span></div>
        <div><span style="font-weight: 500;">SERVICE TYPE :</span> <span style="font-weight: bold; color: #333;">${rowData["Service type"]}</span></div>
        <div><span style="font-weight: 500;">ORDER TYPE :</span> <span style="font-weight: bold; color: #333;">${rowData["Order type"]}</span></div>
        <div><span style="font-weight: 500;">STATUS:</span> <span style="font-weight: bold; color: green;">${rowData.Status}</span></div>
        <div><span style="font-weight: 500;">PCR Eligibility:</span> <span style="font-weight: bold; color: green;">${rowData["Considered for PCR"]}</span></div>
        <div><span style="font-weight: 500;">Slab Eligibility:</span> <span style="font-weight: bold; color: green;">${rowData["Considered for slab"]}</span></div>
      </div>

      <div style="margin-bottom: 5px;  border-radius: 8px; background-color: #fdfdfd; font-family: Arial, sans-serif;">
        <h5 style="border-bottom: 2px solid #0d6efd; padding-bottom: 8px; margin-bottom: 20px; font-weight: bold; color: #0d6efd; font-size: 20px;">
          DECLARATION
        </h5>
        <div style="padding: 20px; border: 1px solid #ccc;">
          <p style="font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 50px;">
            I hereby declare that the information provided in this report is true, complete, and accurate to the best of my knowledge. 
            I understand that any false or misleading statements may result in corrective action and that all data included has been reviewed and approved in accordance with institutional standards and compliance guidelines.
          </p>
          <table style="width: 100%; border-collapse: collapse;" border="1">
            <tr>
              <td>--------------------------------</td>
              <td>--------------------------------</td>
            </tr>
            <tr>
              <td><strong>SIGNATURE OF AUTHORITY</strong></td>
              <td><strong>DATE</strong></td>
            </tr>
          </table>
        </div>
        
      </div>
      <p style="font-size: 10px; margin-top: 20px;">© Lakmal C. Buddhima</p>
    </div>

    `;
  }

  // // PEO Package PCR
  // if ("PEO PCR ID" in rowData || "PEO_PCR_ID" in rowData) {
  //   return `
  //     <div style="padding:24px; font-family:Arial,sans-serif;">
  //       <h1 style="color:#2d3748;">${title} Report</h1>
  //       <h2 style="margin-top:16px;">PEO PCR ID: ${
  //         rowData["PEO PCR ID"] || rowData["PEO_PCR_ID"] || ""
  //       }</h2>
  //       <p>Status: <b>${rowData.Status || rowData.STATUS || "N/A"}</b></p>
  //       ${renderTable([
  //         ["Tariff ID", rowData["Tariff ID"] || rowData["TARIFF_ID"]],
  //         ["Tariff Name", rowData["Tariff Name"] || rowData["TARIFF_NAME"]],
  //         [
  //           "Rental Wo Tax",
  //           rowData["Rental Wo Tax"] || rowData["RENTAL_WO_TAX"],
  //         ],
  //         ["Service Type", rowData["Service Type"] || rowData["SERVICE_TYPE"]],
  //         ["Order Type", rowData["Order Type"] || rowData["ORDER_TYPE"]],
  //         ["PCR", rowData["PCR"]],
  //       ])}
  //       <footer style="margin-top:40px; font-size:12px; color:#888;">
  //         © 2025 Report generated by html2pdf
  //       </footer>
  //     </div>
  //   `;
  // }
}

// main function to generate single data pdf
export function generateHtml2Pdf(rowData, title) {
  const htmlString = getReportHtml(rowData, title);

  // Create a temporary DOM element
  const container = document.createElement("div");
  container.innerHTML = htmlString;
  document.body.appendChild(container);

  html2pdf()
    .from(container)
    .set({
      margin: 0.5,
      filename: `${title}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .save()
    .then(() => {
      document.body.removeChild(container);
    });
}
