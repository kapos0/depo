import moment from "moment";

export function FormatDate(timestamp: number) {
    return new Date(timestamp);
}

export function FormatDateForText(date: any) {
    return moment(date).format("L");
}

export function FormatReminderTime(timestamp: number) {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return timeString;
}

export function getDateRange(startDate: any, endDate: any) {
    const start = moment(new Date(startDate), "MM/DD/YYYY");
    const end = moment(new Date(endDate), "MM/DD/YYYY");
    const dates = [];
    while (start.isSameOrBefore(end)) {
        dates.push(start.format("MM/DD/YYYY"));
        start.add(1, "days");
    }
    return dates;
}
