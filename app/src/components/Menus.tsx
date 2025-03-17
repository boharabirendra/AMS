export interface MenusProps {
  menus: string[] | undefined;
}

export default function Menus({ menus }: MenusProps) {
  return (
    <div>
      <ul className="flex gap-2 items-center">
        {menus?.map((menu, index) => (
          <li key={index}>
            <button className="py-1 px-3 font-bold rounded-4xl text-blue-500 bg-gray-200 cursor-pointer">
              {menu}
            </button>
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
