import moment from "moment";
const today = moment()
export const testEvent = {
    title: 'abc',
    tasks: [
      {
        title: 'Find Venue',
        start: today.subtract(1,'day').toISOString(),
        description:
          'Look for a suitable venue that can accommodate 15 guests and is within the budget.',
        end: moment().toISOString(),
      },
      {
        title: 'Book catering',
        start: '2023-07-01T09:00:00Z',
        end: '2023-07-01T17:00:00Z',
        description:
          'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
      },
      {
        title: 'Book catering',
        start: '2023-07-01T09:00:00Z',
        end: '2023-07-01T17:00:00Z',
        description:
          'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
      },
      {
        title: 'Book catering',
        start: '2023-07-01T09:00:00Z',
        end: '2023-07-01T17:00:00Z',
        description:
          'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
      }
    ],
  };

export const task = {
  title: 'Find Venue',
  start: '2023-07-01T09:00:00Z',
  description:
      'Look for a suitable venue that can accommodate 15 guests and is within the budget.',
  end: '2023-07-01T17:00:00Z',
  event: {
      id: 1,
      title: "Kid's birthday party",
  },
};