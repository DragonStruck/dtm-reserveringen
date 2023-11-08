import {Cart} from "../classes/cart.js";
import {SelectableRangeCalendar} from "../classes/calendar.js";
import {ReservationHelper} from "../classes/reservationHelper.js";
import {StorageManager} from "../classes/storageManager.js";

const cart = await Cart.getCart();

const reservationHelper = new ReservationHelper();

const calendar = new SelectableRangeCalendar();
calendar.setMaxSelectableDays(3);

const emailField = document.getElementById("insertEmail");
const reservationButton = document.getElementById("reservation-button");

//loads the cartPage page html lines
document.getElementById('loader').style.display = "none";
await cart.generateCartDisplay();
setReservationButtonFunctionality();

function setReservationButtonFunctionality() {
    reservationButton.addEventListener("click", (e) => {
        e.preventDefault();
        placeReservation().then(r => console.log(r)).catch(r => console.log(r));
    });
}


async function createReservation() {
    const reservationTemplate = {
        itemReservationDTOS: [],
        email: "",
        message: "message"
    }


    console.log(emailField.value);
    reservationTemplate.email = emailField.value;

    const itemsToBeReserved = await reservationHelper.getItemsToBeReserved(cart.getCartStorage());
    const reservationPeriodValue = calendar.amountOfDaysBetween(calendar.selectedStartDate, calendar.selectedEndDate) + 1;
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
    reservationButton.disabled = true;
    if (await validReservation()) {
        const reservationTemplate = await createReservation();
        console.log(reservationTemplate, "reservation template");

        const response = await fetch('/api/reservation/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationTemplate)
        });
        if (!response.ok) {
            alert("Er is iets mis gegaan met het plaatsen van de reservering, probeer het nog een keer");
        } else {
            calendar.selectedStartDate = null;
            calendar.selectedEndDate = null;
            calendar.highlightSelectedDates();

            await cart.emptyCart();

            emailField.value = "";

            alert("Reservering is geslaagd");
            await StorageManager.setReservationsInStorage();
        }
    }
    reservationButton.disabled = false;
}

async function validReservation() {
    const cartInventory = cart.getCartStorage();
    if (![...cartInventory.values()].some(value => value !== 0)) {
        alert("Doe eerst producten in je mandje");
        return false;
    }

    if (!calendar.selectedStartDate) {
        alert("Selecteer eerst een datum voordat je reserveert ");
        return false;
    }

    if (emailField.value === "") {
        alert("Voer eerst je email in");
        return false;
    }

    const startDate = calendar.selectedStartDate;
    const endDate = calendar.selectedEndDate;
    const products = await StorageManager.getAllProducts();
    const itemReservations = await StorageManager.getAllItemReservations();
    const validReservation = reservationHelper.isReservationAvailable(cartInventory, startDate, calendar.amountOfDaysBetween(startDate, endDate) + 1, products, itemReservations);

    if (!validReservation) {
        alert("De items zijn niet beschikbaar op deze datum(s), verander de reserveringsperiode of je producten");
        return false;
    }

    return true;
}



