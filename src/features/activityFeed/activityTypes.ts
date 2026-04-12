// A union type — every activity must be one of these four categories.
// Adding a new type here forces TypeScript to remind you to handle
// it everywhere it's used (switch statements, style maps, etc.)
export type ActivityEventType =
  | 'lead_added'
  | 'status_changed'
  | 'lead_contacted'
  | 'lead_converted';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  leadName: string;
  description: string;
  timestamp: Date;
  assignedTo: string;
}

export interface ActivityFeedState {
  events: ActivityEvent[];
  isLive: boolean;
}