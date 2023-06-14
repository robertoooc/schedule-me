import { User } from "@prisma/client";
interface Position {
  id: string;
  name: string;
  users: User[];
  organization: company;
}
interface company {
  id: string;
  name: string;
  employees?: User[];
  positions: Position[];
}
interface props {
  position: Position | undefined;
}
export default function Calendar(position: props) {
  console.log("inside", position);
  const dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = new Date(Date.now());
  const day = today.toString().slice(0, 3);
  const dayIndex = dayArr.indexOf(day);
  const week = dayArr.map((day, index) => {
    const className = index === dayIndex ? "bg-sky-400" : "";
    return (
      <div className={`px-4 py-2 ${className}`} key={day}>
        <p>{day}</p>
      </div>
    );
  });

  const employees = position.position?.users.map((user) => {
    return (
      <div className="flex items-center px-4 py-2" key={user.id}>
        <p>{user.name}</p>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-9">
      <div className="col-start-1 col-span-2"></div>

      {week}

      {employees && (
        <div className="col-start-1 row-start-2 col-span-2 flex flex-col">
          {employees}
        </div>
      )}

      <div className="col-start-3 row-start-2 col-span-7 flex flex-wrap"></div>
    </div>
  );
}
