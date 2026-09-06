import type { ReactNode } from "react";

export const Badge = ({ children }: { children: ReactNode[] | string | undefined }) => {
  return (
    <div className="bg-muted p-1 px-2 rounded-full inline-flex gap-2 items-center text-sm text-muted-foreground">
      {children}
    </div>
  );
};
