import Button from "./Ui/Button";

export interface MenusProps {
  menus: string[] | undefined;
}

export default function Menus({ menus }: MenusProps) {
  return (
    <div>
      <ul className="flex gap-2 items-center">
        {menus?.map((menu, index) => (
          <li key={index}>
            <Button isActive={false}>{menu}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const MenuSkeleton = () => {
  return (
    <ul className="flex gap-2 items-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <div className="py-1 px-3 w-20 h-8 rounded-4xl bg-gray-300 animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
};
