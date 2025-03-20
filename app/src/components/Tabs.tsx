import React, { useState, ReactElement } from "react";

import { PanelProps } from "./Ui/Panel";
import Button from "./Ui/Button";

interface TabsProps {
  children?: ReactElement<PanelProps>[];
}

export function Tabs({ children }: TabsProps) {
  const [activePanel, setActivePanel] = useState<number>(0);

  const handleActivePanel = (index: number) => {
    setActivePanel(index);
  };

  const renderPanels = () => {
    return (
      <>
        {React.Children.toArray(children).map((child, index) => {
          const panel = child as ReactElement<PanelProps>;

          return (
            <li key={index}>
              <Button
                isActive={activePanel === index}
                onClick={() => handleActivePanel(index)}
              >
                {panel.props.panelName}
              </Button>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <div className="px-6">
      <div>
        <ul className="flex gap-3">{renderPanels()}</ul>
      </div>
      <div>{children && children[activePanel]}</div>
    </div>
  );
}
