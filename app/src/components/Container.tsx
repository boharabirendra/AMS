import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto max-w-7xl px-4">{children}</div>;
}
