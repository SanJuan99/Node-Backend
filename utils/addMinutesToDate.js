const moment = require('moment-timezone');

// Set default timezone to Norway
const timezone = 'Europe/Oslo';

exports.addMinutesToDate = () => {
  return moment().tz(timezone).add(15, 'minutes').add(2, 'hours').toDate();
};