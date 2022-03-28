import pino from 'pino';

const logger = pino();

const dayMapper = {
  Mon: 'MON',
  Tues: 'TUE',
  Weds: 'WED',
  Thurs: 'THU',
  Fri: 'FRI',
  Sat: 'SAT',
  Sun: 'SUN'
};

export { logger, dayMapper };
