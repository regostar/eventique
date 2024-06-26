import moment from "moment";
const today = moment()
export const testEvent = {
  title: 'abc',
  start: '2023-07-02T09:00:00Z',
  end: '2023-07-03T17:00:00Z',
  purpose: 'Celebrate a birthday party event of my kid. with a budget of less than $100',
  tasks: [
    {
      title: 'Find Venue',
      start: '2023-07-02T09:00:00Z',
      description:
      'Look for a suitable venue that can accommodate 15 guests and is within the budget.',
      end: '2023-07-03T17:00:00Z',
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
    },
    {
      title: 'Book catering',
      start: '2023-07-01T09:00:00Z',
      end: '2023-07-01T17:00:00Z',
      description:
        'Contact caterers and finalize vegetarian meal for 15 guests, ensuring it fits within the budge.',
    },
  ],
};

export const events = [
  {
    title: 'Event 1',
    start: '2024-04-20',
    end: '2024-04-22',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 3',
    start: '2024-06-01',
    end: '2024-06-03',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
  {
    title: 'Event 2',
    start: '2024-05-10',
    end: '2024-05-12',
  },
];

export const task = {
  title: 'Find Venue',
  start: '2023-07-01T09:00:00Z',
  description:
      'Look for a suitable venue that can accommodate 15 guests and is within the budget.',
  end: '2023-07-01T17:00:00Z',
  event: {
      id: 1,
      title: "Kid's birthday party",
  }
}