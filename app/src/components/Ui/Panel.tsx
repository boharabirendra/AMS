import { ReactNode } from "react";

export interface PanelProps {
  children: ReactNode;
  panelName: string;
}

export default function Panel({ children }: PanelProps) {
  return <div className="">{children}</div>;
}
