import { writable } from "svelte/store";

export type AttendanceData = {
    entryId: number,
    lrn: number,
    gradeLevel: string,
    section: string,
    fullname: string,
    timeEntered: Date,
    entryCheckedBy: string,
    timeExited: Date,
    exitCheckedBy: string
}

export const attendanceData = writable<Promise<AttendanceData[]>>()