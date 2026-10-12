/**
 * The day of a visit. `when` labels each step on the time axis; the step
 * marked `arrival` shows the hour the visitor picked instead.
 */
export const VISIT_STEPS = [
  {
    when: 'Any time',
    title: 'You message on WhatsApp',
    description:
      'Say what hurts or what you would like, and where you are. You get a personal recommendation.',
  },
  {
    when: 'Same chat',
    title: 'You agree the hour',
    description:
      'Pick the date and time that suit you. Confirmation and preparation details arrive in the same conversation.',
  },
  {
    when: 'arrival',
    title: 'Richard arrives, equipped',
    description:
      'He brings the table and everything the session needs. All you need is a quiet spot.',
  },
  {
    when: 'Afterwards',
    title: 'You stay where you are',
    description:
      'No commute and no traffic. The session ends and you are already home.',
  },
] as const;
