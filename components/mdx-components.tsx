// import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-6 text-foreground">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(String(children));
    return (
      <h2
        id={id}
        className="text-2xl font-semibold mb-4 mt-8 text-foreground scroll-mt-16"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const id = generateId(String(children));
    return (
      <h3
        id={id}
        className="text-xl font-medium mb-3 mt-6 text-foreground scroll-mt-16"
      >
        {children}
      </h3>
    );
  },
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-foreground">{children}</li>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">
      <pre className="overflow-x-auto p-4 bg-muted rounded-lg">{children}</pre>
    </div>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic mb-4 text-muted-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <Separator className="my-6" />,
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
};
