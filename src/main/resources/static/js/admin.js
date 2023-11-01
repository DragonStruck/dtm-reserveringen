import {StorageManager} from "../classes/storageManager.js";

const reservations = await StorageManager.getReservations();
console.log(reservations);
setReservationTable();
function setReservationTable() {
    let table = document.getElementById("reservation-table");
    table.appendChild(getTableHeader());
    console.log(reservations);
    reservations.forEach(reservation => {
        const tableRow = reservation.getTableRow();
        table.appendChild(tableRow)
    });
}

function getTableHeader() {
    let tableHeader = document.createElement("tr");

    tableHeader.innerHTML = `
        <th>Name</th>
        <th>Amount of products</th>
        <th>Datum(s)</th>
        `;
    return tableHeader;
}







