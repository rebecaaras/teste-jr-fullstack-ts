import { addMinutes, getDay, isWithinInterval, setHours, setMinutes } from 'date-fns';
import { CalendarAvailability, CalendarSlot } from '../types';
import { Weekday, Time } from '../types';

/**Verifies if the slot of the event is an available time in schedule. */
export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  type Workday = {
    weekday: Weekday;
    range: [Time, Time];
  }

  const doctorSchedule: Workday[] = availability.include;
  const eventStartTime: Date = slot.start
  const eventEndTime: Date = addMinutes(eventStartTime, slot.durationM)
  
  const workday: Workday | undefined =  doctorSchedule.find(workday => workday.weekday === getDay(eventStartTime))
  if (!workday){
    return false
  } 

  //convert workday interval available to Date
  let workdayStartTime: Date = setHours(eventStartTime, workday.range[0].hours)
  workdayStartTime = setMinutes(workdayStartTime, workday.range[0].minutes)

  let workdayEndTime: Date = setHours(eventStartTime, workday.range[1].hours)
  workdayEndTime = setMinutes(workdayEndTime, workday.range[1].minutes)
  
  if (isWithinInterval(eventStartTime, {start: workdayStartTime, end: workdayEndTime}) 
    && (isWithinInterval(eventEndTime, {start: workdayStartTime, end: workdayEndTime}))){
      return true
  } else {
    return false
  }

};
