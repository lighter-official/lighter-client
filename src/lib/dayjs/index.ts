import dayjs from "dayjs";
import "dayjs/locale/ko";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const locale = "ko";
dayjs.locale(locale);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export default dayjs;

export function day(
  date?: string | number | dayjs.Dayjs | Date | null | undefined
) {
  return dayjs.tz(dayjs(date).utc(), "Asia/Seoul");
}
