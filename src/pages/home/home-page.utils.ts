import { Items } from "./home-page.ui";

export function findMinMaxDates(items: Items): [Date, Date] {
  const allDates: Date[] = Object.values(items)
    .flatMap((link) => link.times.map((time) => [time.start, time.end]))
    .flat();
  if (allDates.length === 0) {
    throw new Error("Array is empty");
  }
  let minDate = allDates[0];
  let maxDate = allDates[0];
  for (let i = 1; i < allDates.length; i++) {
    if (allDates[i] < minDate) {
      minDate = allDates[i];
    }
    if (allDates[i] > maxDate) {
      maxDate = allDates[i];
    }
  }
  return [minDate, maxDate];
}
