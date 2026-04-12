import type { ActivityEvent, ActivityEventType } from '../features/activityFeed/activityTypes';

const LEAD_NAMES = [
  'Aarav Shah', 'Priya Mehta', 'Rohan Verma', 'Sneha Iyer',
  'Karan Patel', 'Ananya Nair', 'Vikram Desai', 'Meera Krishnan',
  'Arjun Sharma', 'Divya Reddy', 'Nikhil Joshi', 'Pooja Gupta',
];

const AGENTS = ['Prashant Kumar', 'Sneha Joshi', 'Rahul Singh'];

const EVENT_TYPES: ActivityEventType[] = [
  'lead_added',
  'status_changed',
  'lead_contacted',
  'lead_converted',
];

// Returns a human-readable description based on the event type.
// Record<ActivityEventType, ...> guarantees every event type
// has a description — TypeScript errors if one is missing.
const getDescription = (
  type: ActivityEventType,
  leadName: string,
  agent: string
): string => {
  const descriptions: Record<ActivityEventType, string> = {
    lead_added:      `New lead ${leadName} was added by ${agent}`,
    status_changed:  `${leadName}'s status was updated to Contacted`,
    lead_contacted:  `${agent} reached out to ${leadName}`,
    lead_converted:  `${leadName} was successfully converted by ${agent}`,
  };
  return descriptions[type];
};

// Picks a random item from any array.
// The generic <T> means this works for any array type —
// string[], ActivityEventType[], anything.
const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateActivityEvent = (): ActivityEvent => {
  const type      = pickRandom(EVENT_TYPES);
  const leadName  = pickRandom(LEAD_NAMES);
  const agent     = pickRandom(AGENTS);

  return {
    id:          `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    leadName,
    description: getDescription(type, leadName, agent),
    timestamp:   new Date(),
    assignedTo:  agent,
  };
};

// Generates an initial batch of events with staggered timestamps
// so the feed doesn't look empty on first load.
export const generateInitialEvents = (count: number): ActivityEvent[] => {
  return Array.from({ length: count }, (_, i) => {
    const event = generateActivityEvent();
    // Subtract minutes so older events show older timestamps
    event.timestamp = new Date(Date.now() - i * 3 * 60 * 1000);
    return event;
  });
};