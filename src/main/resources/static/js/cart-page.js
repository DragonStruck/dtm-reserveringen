import {Cart} from "../classes/cart.js";
import {SelectableRangeCalendar} from "../classes/calendar.js";
import {ReservationHelper} from "../classes/reservationHelper.js";
import {StorageManager} from "../classes/storageManager.js";

const cart = new Cart();

const reservationHelper = new ReservationHelper();

const calendar = new SelectableRangeCalendar();
calendar.setMaxSelectableDays(3);

//loads the cartPage page html lines
document.getElementById('loader').style.display = "none";
cart.generateCartDisplay();
setReservationButtonFunctionality();

function setReservationButtonFunctionality() {
    const reservationButton = document.getElementById("reservation-button");
    reservationButton.addEventListener("click", (e) => {
        e.preventDefault();
        placeReservation().then(r => console.log(r)).catch(r => console.log(r));
    });
}


async function createReservation() {
    const reservationTemplate = {
        itemReservationDTOS: [],
        accountDTO: {
            id: 1
        },
        message: "message"
    }

    const itemsToBeReserved = await reservationHelper.getItemsToBeReserved(cart.getCartStorage());
    const reservationPeriodValue = calendar.amountOfDaysBetween(calendar.selectedStartDate, calendar.selectedEndDate) + 1;
    const date = calendar.selectedStartDate;
    console.log(date, "date for tempaltte");
    console.log(reservationHelper.dateToString(date), "date string");
    const reservationDateValue = reservationHelper.dateToString(calendar.selectedStartDate);

    itemsToBeReserved.forEach(item => {
        reservationTemplate.itemReservationDTOS.push({
                reservationDate: reservationDateValue,
                reservationPeriod: reservationPeriodValue,
                itemDTO: {
                    id: item
                }
            }
        )
    });

    return reservationTemplate;
}


async function placeReservation() {
    if (await validReservation()) {
        const reservationTemplate = await createReservation();
        console.log(reservationTemplate, "reservation template");

        await fetch('reservation/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationTemplate)
        }).then(response => console.log(response))
            .catch(error => console.error('Error:', error));

        calendar.selectedStartDate = null;
        calendar.selectedEndDate = null;
        calendar.highlightSelectedDates();
        alert("Reservering is geslaagd");
        await StorageManager.setReservationsInStorage();
    }
}

async function validReservation() {
    const cartInventory = cart.getCartStorage();
    if (cartInventory.size === 0) {
        alert("Doe eerst producten in je mandje");
        return false;
    }

    if (!calendar.selectedStartDate) {
        alert("Selecteer eerst een datum voordat je reserveert ");
        return false;
    }

    const startDate = calendar.selectedStartDate;
    const endDate = calendar.selectedEndDate;
    const validReservation = await reservationHelper.isValidReservation(cartInventory, startDate, calendar.amountOfDaysBetween(startDate, endDate) + 1);
    if (!validReservation) {
        alert("De items zijn niet beschikbaar op deze datum(s), verander de reserveringsperiode of je producten");
    }
    return validReservation;
}
