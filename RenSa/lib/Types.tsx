export type HabitType = {
    name: string;
    type: { name: string; icon: string };
    when: string;
    startDate: Date;
    endDate: Date;
    reminder: string;
    actions: {
        status: "Missed" | "Completed" | "Waiting";
        date: string;
        time: string;
    };
    frequency: string;
};
