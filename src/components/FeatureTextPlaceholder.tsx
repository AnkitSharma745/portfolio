interface FeatureTextPlaceholderProps {
  title: string;
  feature?: string;
  variant?: "card" | "detail";
}

export default function FeatureTextPlaceholder({
  title,
  feature,
  variant = "card",
}: FeatureTextPlaceholderProps) {
  const isDetail = variant === "detail";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/80 to-accent/80 p-6 text-center ${
        isDetail ? "min-h-[300px] rounded-2xl" : ""
      }`}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div
        className={`z-10 flex flex-col items-center justify-center ${
          isDetail ? "max-w-xl space-y-4" : "space-y-2"
        }`}
      >
        <h4
          className={`font-bold text-white drop-shadow-md ${
            isDetail ? "text-3xl md:text-4xl" : "text-xl"
          }`}
        >
          {title}
        </h4>
        {feature && (
          <p
            className={`font-medium text-white/90 drop-shadow-sm ${
              isDetail
                ? "mt-2 border-t border-white/20 pt-4 text-base md:text-lg"
                : "mt-2 text-sm"
            }`}
          >
            {feature}
          </p>
        )}
      </div>
    </div>
  );
}
