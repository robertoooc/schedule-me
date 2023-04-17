import { User } from "@prisma/client"

interface props{
  users: User ;
}
export default function Employees({ users }: props){
  console.log(users)
  // const user = users?.forEach((user)=>{
  //   return(
  //     <div>
  //       <p>{user.name}</p>
  //     </div>
  //   )
  // })
  console.log(users.name)
  return(
    <div>
      {users.name}
    </div>
  )
}