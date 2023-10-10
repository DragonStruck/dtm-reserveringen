import {SelectableRangeCalendar} from "../classes/calendar.js";

const calendar = new SelectableRangeCalendar();

const nonSelectableDates = [
    new Date(2023, 10, 6),
    new Date(2023, 10, 7),
    new Date(2023, 10, 8),
    new Date(2023, 10, 16),
    new Date(2023, 10, 17),
    new Date(2023, 10, 21),
];
calendar.setNonSelectableDates(nonSelectableDates);

calendar.addNonSelectableDate(new Date(2023, 10, 25));

calendar.setMaxSelectableDays(5);

const dayOverrides = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
calendar.overrideDayNames(dayOverrides);

const MonthOverrides = [
    "Januari", "Februari", "Maart", "April",
    "Mei", "Juni", "Juli", "Augustus",
    "September", "Oktober", "November", "December"
];
calendar.overrideMonthNames(MonthOverrides);


document.getElementById('getSelectedStartDate').addEventListener('click', () => {
    alert(calendar.getSelectedStartDate());
})

document.getElementById('getSelectedEndDate').addEventListener('click', () => {
    alert(calendar.getSelectedEndDate());
})