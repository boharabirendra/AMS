import clsx from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export default function Button({ className, isActive, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all cursor-pointer",
        className,
        isActive && "bg-blue-700"
      )}
      {...props}
    ></button>
  );
}
