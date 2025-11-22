interface ProgressBarProps {
  label: string;
  percentage?: number; // Optional custom % (random for now)
  darkMode: boolean;
}

export default function ProgressBar({
  label,
  percentage = Math.floor(70 + Math.random() * 30),
  darkMode,
}: ProgressBarProps) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div
        className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
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
