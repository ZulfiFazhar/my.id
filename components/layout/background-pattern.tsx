"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";

export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 12],
          [18, 5],
          [22, 8],
          [26, 13],
          [30, 6],
          [25, 20],
          [35, 15],
          [40, 8],
          [45, 25],
          [50, 12],
          [55, 30],
        ]}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "fill-gray-400/20 stroke-gray-400/20",
          "dark:fill-gray-600/20 dark:stroke-gray-600/20"
        )}
      />
    </div>
  );
}
