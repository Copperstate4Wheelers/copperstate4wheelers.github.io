import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

export interface Event {
  id: string;
  data: {
    title: string;
    date: Date;
    time: string;
    description: string;
    invite: string;
  };
}

/// Transforms a native date object to the correct value in the local timezone.
/// This is needed because Zod parses dates in frontmatter in the UTC timezone.
export function local_date(event: Event): TZDate {
  return new TZDate(
    event.data.date.getUTCFullYear(),
    event.data.date.getUTCMonth(),
    event.data.date.getUTCDate(),
    "America/Phoenix",
  );
}

export function humanized_date(event: Event): string {
  return format(local_date(event), "eeee, MMM do");
}
