import React, { MouseEventHandler } from "react";

interface IButtonProps {
  text: string;
  onClick: MouseEventHandler;
}
// TODO add styles
export function Button({ text, onClick }: IButtonProps): React.ReactElement {
  return <button onClick={onClick}>{text}</button>;
}
