interface LiveIndicatorProps {
  isLive: boolean;
  onToggle: () => void;
  onClear: () => void;
}

const LiveIndicator = ({ isLive, onToggle, onClear }: LiveIndicatorProps) => (
  <div className="flex items-center gap-3">

    {/* Clear button */}
    <button
      onClick={onClear}
      className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
    >
      Clear
    </button>

    {/* Pause / Resume toggle */}
    <button
      onClick={onToggle}
      className={[
        'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
        isLive
          ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
      ].join(' ')}
    >
      {/* Animated dot — only pulses when live */}
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
      </span>
      {isLive ? 'Live' : 'Paused'}
    </button>

  </div>
);

export default LiveIndicator;