import React from "react";

interface iButtonComponentProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "submit" | "button";
  state?: "primary" | "secondary" | "outlined";
  position?: "absolute" | "fixed" | "";
}
export default function ButtonComponent({
  title,
  onClick,
  type,
  state = "primary",
  position = "",
}: iButtonComponentProps) {
  if (state === "outlined")
    return (
      <button
        onClick={onClick}
        type={type}
        className={`text-primary ${position} end-2.5 bottom-2.5 bg-white  font-medium rounded-lg text-sm px-4 py-2 border border-primary`}
      >
        {title}
      </button>
    );

  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white  ${position} end-2.5 bottom-2.5 bg-${state} hover:bg-${state}/90 focus:ring-4 focus:outline-none focus:ring-${state}/30 font-medium rounded-lg text-sm px-4 py-2 dark:bg-${state}/60 dark:hover:bg-${state}/90 dark:focus:ring-${state}/95`}
    >
      {title}
    </button>
  );
}
