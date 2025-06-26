import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { DateTime } from "luxon";

interface ParsedEvent extends CollectionEntry<"event"> {
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
    parsed.push({
      ...event,
      dateTime: DateTime.fromJSDate(event.data.date),
    });
  });

  return parsed;
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
