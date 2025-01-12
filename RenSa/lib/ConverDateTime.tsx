import moment from "moment";

export function FormatDate(timestamp: number): Date {
    return new Date(timestamp);
}

export function FormatDateForText(date: Date | string): string {
    return moment(date).format("L");
}

export function FormatReminderTime(timestamp: number): string {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return timeString;
}

export function getDateRange(
    startDate: Date | string,
    endDate: Date | string
): string[] {
    const start = moment(new Date(startDate), "MM/DD/YYYY");
    const end = moment(new Date(endDate), "MM/DD/YYYY");
    const dates: string[] = [];
    while (start.isSameOrBefore(end)) {
        dates.push(start.format("MM/DD/YYYY"));
        start.add(1, "days");
    }
    return dates;
}
