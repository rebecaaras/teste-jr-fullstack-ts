import { addMinutes, eachDayOfInterval, getDay, isBefore, isSameDay, setHours, setMinutes } from 'date-fns';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isEqual } from 'lodash';
import { isSlotAvailableWithBuffer } from '../3-is-slot-available-with-buffer/is-slot-available-with-buffer';

export const listAvailable30MinuteSlots = (
  availability: CalendarAvailability,
  events: CalendarEvent[],
  range: [Date, Date]
): CalendarSlot[] => {
  const { include: doctorSchedule } = availability;
  const dateInterval = { start: range[0], end: range[1] };
  const daysInRange = eachDayOfInterval(dateInterval);

  const availableSlots: CalendarSlot[] = [];

  for (const date of daysInRange) {
    const workday = doctorSchedule.find((wd) => wd.weekday === getDay(date));
    if (!workday) continue;

    // Filtra eventos que ocorrem no mesmo dia
    const dailyEvents = events.filter((event) => {
      if (isSameDay(event.start, date)){
        return event
      }
    });

    // Define horário de início e fim do expediente
    const workdayStart = setMinutes(setHours(date, workday.range[0].hours), workday.range[0].minutes);
    const workdayEnd = setMinutes(setHours(date, workday.range[1].hours), workday.range[1].minutes);
    
    //Adiciona newSlot a availableSlots se não houver eventos no horário;
    let currentSlotStart = workdayStart;
    while (isBefore(addMinutes(currentSlotStart, 30), workdayEnd) || isEqual(addMinutes(currentSlotStart, 30), workdayEnd)){
      const newSlot: CalendarSlot = {
        start: currentSlotStart,
        durationM: 30,
      };

      if (isSlotAvailableWithBuffer(availability, dailyEvents, newSlot)) {
        availableSlots.push(newSlot);
      }

      // Atualiza o início do próximo slot
      currentSlotStart = addMinutes(currentSlotStart, 30);
    }

  };
  return availableSlots;
};