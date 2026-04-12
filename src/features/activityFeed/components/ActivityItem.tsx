import { useState, useEffect } from 'react';
import type { ActivityEvent } from '../activityTypes';
import { EVENT_CONFIG } from '../activityConfig';
import { formatRelativeTime } from '../../../utils/formatters';

interface ActivityItemProps {
  event: ActivityEvent;
  isNew?: boolean;
}

const ActivityItem = ({ event, isNew = false }: ActivityItemProps) => {
  const config = EVENT_CONFIG[event.type];

  // Relative time updates every 30 seconds so "just now" becomes "30s ago" etc.
  const [relativeTime, setRelativeTime] = useState(() =>
    formatRelativeTime(event.timestamp)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRelativeTime(formatRelativeTime(event.timestamp));
    }, 30_000);
    return () => clearInterval(timer);
  }, [event.timestamp]);

  return (
    // Slide-in animation for new events using Tailwind's animate-pulse alternative.
    // We use a CSS transition on opacity and transform for the entrance effect.
    <div
      className={[
        'flex items-start gap-3 p-4 rounded-lg transition-all duration-500',
        isNew
          ? 'bg-blue-50/60 dark:bg-blue-900/10 animate-pulse-once'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40',
      ].join(' ')}
    >
      {/* Icon bubble */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${config.bgColor} ${config.color}`}>
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
          {event.description}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {relativeTime}
        </p>
      </div>

      {/* Live dot for the newest event */}
      {isNew && (
        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5 animate-ping" />
      )}
    </div>
  );
};

export default ActivityItem;