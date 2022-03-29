import pino from 'pino';

interface DayMapperInterface {
  [key: string]: string;
}

const logger = pino();

const dayMapper: DayMapperInterface = {
  Mon: 'MON',
  Tues: 'TUE',
  Weds: 'WED',
  Thurs: 'THU',
  Fri: 'FRI',
  Sat: 'SAT',
  Sun: 'SUN'
};

export { logger, dayMapper };
