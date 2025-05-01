import FuzzyText from "@/components/ui/fuzzy";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-muted/30 gap-2">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        color="#000000"
        fontSize="clamp(4rem, 8vw, 8rem)"
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        color="#000000"
        fontSize="clamp(1.5rem, 2vw, 2.5rem)"
      >
        not found
      </FuzzyText>
    </div>
  );
}
