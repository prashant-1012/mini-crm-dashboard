import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { addEvent, toggleLive, clearFeed } from '../activitySlice';
import { generateActivityEvent } from '../../../utils/activityGenerator';

const INTERVAL_MS = 4000; // new event every 4 seconds

export const useActivityFeed = () => {
  const dispatch  = useAppDispatch();
  const { events, isLive } = useAppSelector((state) => state.activityFeed);

  // useRef stores the interval ID without causing re-renders.
  // If we used useState for this, every interval tick would
  // trigger an unnecessary component re-render.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isLive) {
      // Start the interval
      intervalRef.current = setInterval(() => {
        dispatch(addEvent(generateActivityEvent()));
      }, INTERVAL_MS);
    } else {
      // Stop the interval when paused
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup function — runs when component unmounts OR
    // when isLive changes. Prevents memory leaks.
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLive, dispatch]);

  return {
    events,
    isLive,
    toggleLive:  () => dispatch(toggleLive()),
    clearFeed:   () => dispatch(clearFeed()),
  };
};