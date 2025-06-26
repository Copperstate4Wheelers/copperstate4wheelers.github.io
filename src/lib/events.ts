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
    const { year, month, day } =
      /.*\/events\/(?<year>\d\d\d\d)\/(?<month>\d\d)-(?<day>\d\d)--.*/.exec(
        event.filePath!,
      )!.groups!;

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
 * Returns all of the events for the year, sorted by date.
 **/
export const getEventsForYear = async (
  year: number,
): Promise<ParsedEvent[]> => {
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

  return thisYear;
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
