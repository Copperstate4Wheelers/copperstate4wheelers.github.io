import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { DateTime } from "luxon";

export interface ParsedEvent extends CollectionEntry<"event"> {
  dateTime: DateTime;
}

/**
 * Returns the events collection but with any additional standard processing
 * applied.
 **/
export const getEventsCollection = async (): Promise<ParsedEvent[]> => {
  const events = await getCollection("event");
  const parsed: ParsedEvent[] = [];

  events.forEach((event) => {
    // Match a file in the events directory with the format
    // /events/year/MM-dd--event-name.md
    // Note that year is the top folder, months and days always have 2 digits
    // (leading zeros when needed), and the event name comes after two hypens.
    const match =
      /.*\/events\/(?<year>\d\d\d\d)\/(?<month>\d\d)-(?<day>\d\d)--.*/.exec(
        event.filePath!,
      );
    if (!match || !match.groups) {
      throw new Error(
        `Unable to parse date from event file path! ${event.filePath} \n` +
          `Expected file in the form MM-dd--event-name.md`,
      );
    }

    const { year, month, day } = match.groups!;
    parsed.push({
      ...event,
      dateTime: DateTime.local(parseInt(year), parseInt(month), parseInt(day), {
        zone: "America/Phoenix",
      }),
    });
  });

  return parsed;
};

/**
 * Returns all of the events for the year, sorted by date and bucketed by month.
 *
 * # Example
 *
 *   getEventsForYear(2025) may return [[e1, e2], [e3, e4]] where e1, and e2
 *   are in the same month, while e3 and e4 are in a different month. Months
 *   without events will simply not be present in the list. This way,
 *   identifying the month means just inspecting the first event in each
 *   sub-list.
 **/
export const getEventsForYear = async (
  year: number,
): Promise<ParsedEvent[][]> => {
  const allEvents = await getEventsCollection();
  const thisYear: ParsedEvent[] = [];

  allEvents.forEach((event) => {
    if (event.dateTime.year == year) {
      thisYear.push(event);
    }
  });
  thisYear.sort((a, b) => {
    return a.dateTime.toSeconds() - b.dateTime.toSeconds();
  });

  const bucketedEvents: ParsedEvent[][] = [];
  let month: ParsedEvent[] = [];

  thisYear.forEach((event) => {
    if (month.length == 0) {
      // first event in the month
      month.push(event);
    } else if (month[0].dateTime.month == event.dateTime.month) {
      // event matching current month
      month.push(event);
    } else {
      // found the end of a month
      bucketedEvents.push(month);
      month = [event];
    }
  });

  // last month has to be pushed after iteration completes
  bucketedEvents.push(month);

  return bucketedEvents;
};

/**
 * Returns all upcoming events on the calendar.
 **/
export const getUpcomingEvents = async (
  limit: number,
): Promise<ParsedEvent[]> => {
  const allEvents = await getEventsCollection();
  const thisYear: ParsedEvent[] = [];
  const now = DateTime.now().toSeconds();

  allEvents.forEach((event) => {
    if (event.dateTime.toSeconds() >= now) {
      thisYear.push(event);
    }
  });

  thisYear.sort((a, b) => {
    return a.dateTime.toSeconds() - b.dateTime.toSeconds();
  });

  return thisYear.slice(0, limit);
};

/**
 * Returns the set of all years included in the events collection.
 * e.g. if there is an event for 2024 and another event for 2025, then this
 * function will return [2024, 2025].
 **/
export const getAllYears = async (): Promise<Set<number>> => {
  const events = await getEventsCollection();
  const years = new Set<number>();

  events.forEach((event) => {
    years.add(event.dateTime.year);
  });

  return years;
};
