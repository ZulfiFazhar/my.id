import { techStack } from "@/types/tech";

export function Tech() {
  return (
    <section id="tech" className="container flex flex-col py-4 gap-3">
      <div className="max-w-full">
        <h2 className="text-2xl font-bold">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
        {techStack.map((stack, index) => (
          <div
            key={index}
            className="flex flex-col rounded-md border border-border gap-3 p-4 bg-card"
          >
            <stack.logo />
            <div className="grid gap-1">
              <p className="text-base font-bold">{stack.name}</p>

              <p className="text-sm text-muted-foreground">
                {stack.tech.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
