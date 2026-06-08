interface ProgressBarProps {
  label: string;
  percentage?: number; // Optional custom %
  darkMode?: boolean;  // Deprecated
}

export default function ProgressBar({
  label,
  percentage = 80,
  darkMode,
}: ProgressBarProps) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div
        className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(to right, #6C63FF, #9333ea)",
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
