import { doctorsTable } from "@/db/schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.locale("pt-br");

export function getAvailability(doctor: typeof doctorsTable.$inferSelect) {
  const from = dayjs()
    .utc()
    .day(doctor.availableFromWeekDay)
    .set("hour", Number(doctor.availableFromTime.split(":")[0]))
    .set("minute", Number(doctor.availableFromTime.split(":")[1]))
    .set("second", Number(doctor.availableFromTime.split(":")[2]))
    .local();

  const to = dayjs()
    .utc()
    .day(doctor.availableToWeekDay)
    .set("hour", Number(doctor.availableToTime.split(":")[0]))
    .set("minute", Number(doctor.availableToTime.split(":")[1]))
    .set("second", Number(doctor.availableToTime.split(":")[2]))
    .local();
  return { from, to };
}
