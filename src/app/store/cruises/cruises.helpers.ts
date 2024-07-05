import { Cruise } from '../../models/cruise';
import { Filters } from '../../models/filters';

export const getFilteredCruises = (cruises: Cruise[], filters: Filters) => cruises.filter((cruise: Cruise) => {
  const hoursMultiplier = 1000 * 60 * 60;
  return (cruise.fromPort.toLowerCase().includes(filters.portNameFilter.toLowerCase()) ||
      cruise.toPort.toLowerCase().includes(filters.portNameFilter.toLowerCase())) &&
    (filters.minDurationFilter ? cruise.legDuration >= filters.minDurationFilter * hoursMultiplier : true) &&
    (filters.maxDurationFilter ? cruise.legDuration <= filters.maxDurationFilter * hoursMultiplier : true);
});
