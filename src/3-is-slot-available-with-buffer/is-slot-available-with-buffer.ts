import { addMinutes, areIntervalsOverlapping, subMinutes } from 'date-fns';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isSlotAvailable } from '../1-is-slot-available/is-slot-available';

export const isSlotAvailableWithBuffer = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  slot: CalendarSlot,
): boolean => {
  if (!isSlotAvailable(availability, slot)){
    return false;
  }

  const isOverlapping = events.some(event => {
    const bufferBefore: number = event.buffer?.before?? 0;
    const bufferAfter: number = event.buffer?.after?? 0;

    return areIntervalsOverlapping({start: slot.start, end: addMinutes(slot.start, slot.durationM)},
                                   {start: subMinutes(event.start, bufferBefore), end: addMinutes(event.end, bufferAfter)});
  })

  return !isOverlapping;
};