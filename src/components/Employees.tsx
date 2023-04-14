import { User } from "@prisma/client"

interface props{
  users: User[] | undefined;
}
export default function Employees({ users }: props){
  return(
    <div>

    </div>
  )
}