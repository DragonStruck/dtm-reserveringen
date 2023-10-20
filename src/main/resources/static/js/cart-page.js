import {Cart} from "../classes/cart.js";
import {SelectableRangeCalendar} from "../classes/calendar.js";

const calendar = new SelectableRangeCalendar();
const cart = new Cart();
calendar.addNonSelectableDate(new Date(2023, 10, 25));

calendar.setMaxSelectableDays(3);

const dayOverrides = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
calendar.overrideDayNames(dayOverrides);

const MonthOverrides = [
    "Januari", "Februari", "Maart", "April",
    "Mei", "Juni", "Juli", "Augustus",
    "September", "Oktober", "November", "December"
];
calendar.overrideMonthNames(MonthOverrides);


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

const json2 =
    {
        "itemReservationDTOS": [
            {
                "reservationDate": "2023-10-15",
                "reservationPeriod": 120,
                "itemDTO": {
                    "id": 1
                }
            },
            {
                "reservationDate": "2023-10-16",
                "reservationPeriod": 90,
                "itemDTO": {
                    "id": 2
                }
            }
        ],
        "accountDTO": {
            "id": 1
        }
    }


function createReservation() {
    // const reservationTemplate = {
    //     itemReservationDTOS: [],
    //     accountDTO: sessionStorage.getItem(StorageKeys.ACCOUNT).id
    // }
    //
    // for (let i = cartPage)
    // const itemReservationDTO = {
    //     reservationDate:
    // }
    //
    // return reservationTemplate;
}


async function placeReservation() {
    //const reservationTemplate = createReservation();
    const reservationTemplate = json2;
    console.log(reservationTemplate);

    await fetch('reservation/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationTemplate)
    }).then(response => console.log(response))
        .catch(error => console.error('Error:', error));
}

function validateReservation() {
    //reserveringsperiode opgegeven

    //items in cartPage

    //moet ingelogd zijn
}
