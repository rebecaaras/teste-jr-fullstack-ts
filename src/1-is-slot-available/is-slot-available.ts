import { addMinutes, getDay } from 'date-fns';
import { CalendarAvailability, CalendarSlot } from '../types';
import { Weekday } from '../types';


export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  const doctorSchedule = availability.include;
  const eventWeekday: Weekday = getDay(slot.start) 
  /** Check if day of event is available*/
  const isDayAvailable = () => {
    return doctorSchedule.some(timeSlot => timeSlot.weekday === eventWeekday)
  }

  return isDayAvailable()
};
