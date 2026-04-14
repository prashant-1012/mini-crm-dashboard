import { useActivityFeed } from '../features/activityFeed/hooks/useActivityFeed';
import ActivityItem from '../features/activityFeed/components/ActivityItem';
import LiveIndicator from '../features/activityFeed/components/LiveIndicator';
import PageWrapper from '../components/ui/PageWrapper';

const ActivityPage = () => {
  const { events, isLive, toggleLive, clearFeed } = useActivityFeed();

  return (
    <PageWrapper>
    <div className="flex flex-col gap-6 w-full max-w-2xl">

      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-y-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Activity Feed
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Real-time CRM events across your team.
          </p>
        </div>
        <LiveIndicator
          isLive={isLive}
          onToggle={toggleLive}
          onClear={clearFeed}
        />
      </div>

      {/* Feed card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700/50 overflow-hidden">

        {events.length === 0 ? (
          <div className="p-12 text-center text-gray-400 dark:text-gray-500">
            <p className="text-base font-medium">No activity yet</p>
            <p className="text-sm mt-1">Events will appear here in real time</p>
          </div>
        ) : (
          events.map((event, index) => (
            <ActivityItem
              key={event.id}
              event={event}
              isNew={index === 0}
            />
          ))
        )}

      </div>

      {/* Event count footer */}
      {events.length > 0 && (
        <p className="text-xs text-center text-gray-400 dark:text-gray-500">
          Showing {events.length} most recent events
        </p>
      )}

    </div>
    </PageWrapper>
  );
};

export default ActivityPage;