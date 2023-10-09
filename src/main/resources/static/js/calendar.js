const calendarDays = document.getElementById("calendarDays");
const currentMonth = document.getElementById("currentMonth");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let selectedStartDate = null;
let selectedEndDate = null;

const maxSelectableDays = 3;

const months = [
    "Januari", "Februari", "Maart", "April",
    "Mei", "Juni", "Juli", "Augustus",
    "September", "Oktober", "November", "December"
];

const dayNames = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

const manuallyNonSelectableDates = [
    new Date(2023, 10, 6),
    new Date(2023, 10, 7),
    new Date(2023, 10, 8),

    new Date(2023, 10, 16),
    new Date(2023, 10, 17),

    new Date(2023, 10, 21),
];

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonthIndex = currentDate.getMonth();

function updateCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);

    currentMonth.textContent = months[currentMonthIndex] + " " + currentYear;

    calendarDays.innerHTML = "";

    // Add day names as a header row
    for (const dayName of dayNames) {
        const headerDay = document.createElement("div");
        headerDay.classList.add("calendar-day", "day-name");
        headerDay.textContent = dayName;
        calendarDays.appendChild(headerDay);
    }

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("calendar-day", "empty");
        calendarDays.appendChild(emptyDay);
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const calendarDay = document.createElement("div");
        calendarDay.classList.add("calendar-day");
        calendarDay.textContent = i;
        calendarDay.addEventListener("click", handleDayClick);

        // Check if the date is non-selectable based on the manuallyNonSelectableDates list or dates before today
        const dateToCheck = new Date(currentYear, currentMonthIndex, i);
        if (manuallyNonSelectableDates.some(date => isSameDay(date, dateToCheck)) || dateToCheck < currentDate) {
            calendarDay.classList.add("non-selectable");
        }

        calendarDays.appendChild(calendarDay);
    }

    highlightSelectedDates();
}

// Handled de click... obviously 
function handleDayClick(event) {
    const selectedDay = parseInt(event.target.textContent);
    const clickedDate = new Date(currentYear, currentMonthIndex, selectedDay);

    if (clickedDate < currentDate) {
        return;
    } else {
        for (let i = 0; i < manuallyNonSelectableDates.length; i++) {
            if (isSameDay(clickedDate, manuallyNonSelectableDates[i])) {
                return;
            }
        }
    }

    if (!selectedStartDate) {
        selectedStartDate = clickedDate;
    } else if (!selectedEndDate) {
        selectedEndDate = clickedDate;
        if (selectedStartDate > selectedEndDate) {
            // Swap the dates if the start date is after the end date
            [selectedStartDate, selectedEndDate] = [selectedEndDate, selectedStartDate];
        }
    } else {
        // If both start and end dates are selected, reset the selection
        selectedStartDate = clickedDate;
        selectedEndDate = null;
    }

    if (selectedEndDate && daysBetween(selectedStartDate, selectedEndDate) >= maxSelectableDays) {
        // If the selected range exceeds the maximum allowed days, reset the selection
        selectedStartDate = clickedDate;
        selectedEndDate = null;
    }

    updateCalendar();
}

function highlightSelectedDates() {
    const calendarDays = document.querySelectorAll(".calendar-day");
    calendarDays.forEach((day) => {
        day.classList.remove("selected");

        const dayDate = new Date(currentYear, currentMonthIndex, parseInt(day.textContent));

        if (selectedStartDate && daysBetween(dayDate, selectedStartDate) == 0 && !selectedEndDate) {
            day.classList.add("selected");
        } else if (selectedEndDate) {
            if (selectedStartDate && dayDate >= selectedStartDate && (!selectedEndDate || dayDate <=
                    selectedEndDate)) {
                day.classList.add("selected");
            }
        }
    });
}

function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}

prevMonthBtn.addEventListener("click", () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
        currentYear--;
        currentMonthIndex = 11;
    }
    updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
        currentYear++;
        currentMonthIndex = 0;
    }
    updateCalendar();
});

updateCalendar();