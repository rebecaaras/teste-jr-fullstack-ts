import { addMinutes, areIntervalsOverlapping, getDay, setHours, setMinutes } from 'date-fns';
import { CalendarAvailability, CalendarSlot } from '../types';
import { Weekday, Time } from '../types';

/**Verifies if the slot of the event is an available time in schedule. */
export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  type Workday = {
    weekday: Weekday;
    range: [Time, Time];
  }

  const doctorSchedule = availability.include;
  const eventStartTime = slot.start 
  const eventEndTime = addMinutes(eventStartTime, slot.durationM)
  
  // Check if day of event is available
  const workday: Workday | undefined =  doctorSchedule.find(workday => workday.weekday === getDay(eventStartTime))
  if (!workday){
    console.log('This day is not available in the schedule')
    return false
  }
  
  //convert schedule interval available in event day to Date
  let workdayStartTime: Date = setHours(eventStartTime, workday.range[0].hours)
  workdayStartTime = setMinutes(workdayStartTime, workday.range[0].minutes)

  let workdayEndTime: Date = setHours(eventStartTime, workday.range[1].hours)
  workdayEndTime = setMinutes(workdayEndTime, workday.range[1].minutes)

  console.log(setHours.name)
  const result:boolean =  areIntervalsOverlapping({start: workdayStartTime, end: workdayEndTime},
                          {start: eventStartTime, end: eventEndTime})
  
  return result
};
