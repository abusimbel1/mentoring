export const sheduleProcess = () => {
  const schedule = require('node-schedule');

  schedule.scheduleJob('0 0 * * *', () => {
    // TODO Set the task for today status to Failure at 12 AM every day during the challenge, if the task was not completed by a user this day
  });

  // schedule.scheduleJob(challenge.startDate.addDays(challenge.duration), () => {
  //   //TODO Calculate the achievements status and the challenge state at 12 AM of the last day of the challenge
  // });
};
