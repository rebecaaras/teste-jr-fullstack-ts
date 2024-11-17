import { addMinutes, getDay, getHours, set, toDate } from 'date-fns';
import { CalendarAvailability, CalendarSlot } from '../types';
import { Weekday, Time } from '../types';

export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  //types
  type Workday = {
    weekday: Weekday;
    range: [Time, Time];
}

  //variables
  const doctorSchedule = availability.include;
  const eventDate = slot.start
  const eventWeekday: Weekday = getDay(eventDate) 
  
  /** Check if day of event is available*/
  function isDayAvailable(): boolean {
    return doctorSchedule.some(workday => workday.weekday === eventWeekday)
  }
  
  function availableScheduleDay(): Workday | undefined {
    return doctorSchedule.find((workday) => {
      workday.range[0].hours <= getHours(eventDate)
      console.log(workday);
    })};
    
  if (isDayAvailable()){
    console.log(availableScheduleDay())
  }

  return false
};
