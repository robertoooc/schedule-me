import { User } from "@prisma/client"

interface props{
  users: User ;
  key: string;
}
export default function Employees({ users }: props){

  return(
    <div>
      <div className=" flex place-content-evenly space-x-5">
        <p>{users.name}</p>
        <p>{users.email}</p>
      </div>
    </div>
  )
}