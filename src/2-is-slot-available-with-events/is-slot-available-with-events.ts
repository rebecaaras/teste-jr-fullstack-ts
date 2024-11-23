import { addMinutes, areIntervalsOverlapping } from 'date-fns';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isSlotAvailable } from '../1-is-slot-available/is-slot-available';

export const isSlotAvailableWithEvents = (
  availability: CalendarAvailability,
  events: Array<Omit<CalendarEvent, 'buffer'>>,
  slot: CalendarSlot,
): boolean => {

  if (isSlotAvailable(availability, slot) === true){
    
    const areEventsOverlapping: boolean = events.some(
      event => areIntervalsOverlapping({start: slot.start, end: addMinutes(slot.start, slot.durationM)},{start: event.start, end: event.end}))
    
    return !areEventsOverlapping
  
  } else {
    return false
  }
};

