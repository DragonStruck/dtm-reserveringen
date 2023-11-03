// SelectableRangeCalendar by DragonStruck
import {Cart} from "./cart.js";

export class SelectableRangeCalendar {
    constructor() {
        this.cart = Cart.getCart();
        this.calendarDays = document.getElementById("calendarDays");
        this.currentMonth = document.getElementById("currentMonth");
        this.prevMonthBtn = document.getElementById("prevMonth");
        this.nextMonthBtn = document.getElementById("nextMonth");
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.maxSelectableDays = 3;
        this.months = [
            "Januari", "Februari", "Maart", "April",
            "Mei", "Juni", "Juli", "Augustus",
            "September", "Oktober", "November", "December"
        ];
        this.days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
        this.nonSelectableDates = [];
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonthIndex = this.currentDate.getMonth();

        this.initializeCalendar();
    }


    getSelectedStartDate() {
        return this.selectedStartDate;
    }

    getSelectedEndDate() {
        return this.selectedEndDate;
    }

    setNonSelectableDates(nonSelectableDates) {
        this.nonSelectableDates = nonSelectableDates;
    }

    addNonSelectableDate(nonSelectableDate) {
        this.nonSelectableDates.push(nonSelectableDate);
    }

    setMaxSelectableDays(maxSelectableDays) {
        this.maxSelectableDays = maxSelectableDays;
    }

    overrideMonthNames(monthNames) {
        this.months = monthNames;
        this.updateCalendar();
    }

    overrideDayNames(dayNames) {
        this.days = dayNames;
        this.updateCalendar();
    }

    initializeCalendar() {
        this.updateCalendar();
        this.attachEventListeners();
    }


    updateCalendar() {
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonthIndex, 1);
        const lastDayOfMonth = new Date(this.currentYear, this.currentMonthIndex + 1, 0);

        this.currentMonth.textContent = this.months[this.currentMonthIndex] + " " + this.currentYear;

        this.calendarDays.innerHTML = "";

        // Add day names as a header row
        for (const dayName of this.days) {
            const headerDay = document.createElement("div");
            headerDay.classList.add("calendar-day", "day-name");
            headerDay.textContent = dayName;
            this.calendarDays.appendChild(headerDay);
        }

        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("calendar-day", "empty");
            this.calendarDays.appendChild(emptyDay);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const calendarDay = document.createElement("div");
            calendarDay.classList.add("calendar-day");
            calendarDay.textContent = i;
            calendarDay.addEventListener("click", (event) => this.handleDayClick(event));

            //Check if the date is non-selectable based on the nonSelectableDates list or dates before today
            const dateToCheck = new Date(this.currentYear, this.currentMonthIndex, i);
            if (this.isDateNonSelectable(dateToCheck)) {
                calendarDay.classList.add("non-selectable");
            }

            this.calendarDays.appendChild(calendarDay);
        }

        this.highlightSelectedDates();
    }

    attachEventListeners() {
        this.prevMonthBtn.addEventListener("click", () => {
            this.currentMonthIndex--;
            if (this.currentMonthIndex < 0) {
                this.currentYear--;
                this.currentMonthIndex = 11;
            }
            this.updateCalendar();
        });

        this.nextMonthBtn.addEventListener("click", () => {
            this.currentMonthIndex++;
            if (this.currentMonthIndex > 11) {
                this.currentYear++;
                this.currentMonthIndex = 0;
            }
            this.updateCalendar();
        });
    }

    async handleDayClick(event) {
        const selectedDay = parseInt(event.target.textContent);
        const clickedDate = new Date(this.currentYear, this.currentMonthIndex, selectedDay);

        if (clickedDate < this.currentDate) {
            return;
        }

        if (this.isSameDay(this.selectedStartDate, clickedDate) || this.isSameDay(this.selectedEndDate, clickedDate) ||
                this.isDateBetweenStartAndEndDate(clickedDate) && this.selectedStartDate && this.selectedEndDate) {
            this.selectedStartDate = null;
            this.selectedEndDate = null;
            this.highlightSelectedDates();
            return;
        }

        if (!this.selectedStartDate) {
            this.selectedStartDate = clickedDate;
        } else if (!this.selectedEndDate) {
            if (!(this.amountOfDaysBetween(this.selectedStartDate, clickedDate) <= this.maxSelectableDays - 1)) {
                alert(`Het maximale aantal dagen dat je mag reserveren is ${this.maxSelectableDays}`)
            } else {
                this.selectedEndDate = clickedDate;
                if (this.selectedStartDate > this.selectedEndDate) {
                    [this.selectedStartDate, this.selectedEndDate] = [this.selectedEndDate, this.selectedStartDate];
                }
            }
        } else {
            this.selectedStartDate = clickedDate;
            this.selectedEndDate = null;
        }

        this.highlightSelectedDates();
    }

    highlightSelectedDates() {
        const calendarDays = this.calendarDays.querySelectorAll(".calendar-day");
        const amountOfDaysBetween = this.amountOfDaysBetween(this.selectedStartDate, this.selectedEndDate);
        calendarDays.forEach((day) => {
            day.classList.remove("selected");

            const dayDate = new Date(this.currentYear, this.currentMonthIndex, parseInt(day.textContent));

            if (this.isSameDay(dayDate, this.selectedStartDate)) {
                day.classList.add("selected");
            } else if (this.selectedEndDate) {
                if (this.amountOfDaysBetween(dayDate, this.selectedStartDate) <= amountOfDaysBetween && dayDate > this.selectedStartDate) {
                    day.classList.add("selected");
                }
            }
        });
    }

    isDateNonSelectable(date) {
        return this.nonSelectableDates.some(d => this.isSameDay(date, d)) || date < this.currentDate;
    }

    isDateBetweenStartAndEndDate(date) {
        const amountOfDaysBetween = this.amountOfDaysBetween(this.selectedStartDate, this.selectedEndDate);
        return (this.amountOfDaysBetween(date, this.selectedStartDate) <= amountOfDaysBetween && date > this.selectedStartDate);
    }

    amountOfDaysBetween(date1, date2) {
        //if date is null, return 0 instead of ~19536 which it else would
        if (date1 == null || date2 == null) {
            return 0;
        }
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }

    isSameDay(date1, date2) {
        if (date1 === null || date2 === null) {
            return false;
        }
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();

    }
}