import { User } from "@prisma/client"

interface props{
  users: User[] ;
}
export default function Employees({ users }: props){

  return(
    <div>
      <p className="text-center bg-slate-300 text-lg">Employees</p>
      <div className=" flex place-content-evenly">
        <p>Name</p>
        <p>Email</p>
      </div>
      <div>
        {users.map((user)=>{
          return(
          <div key={user.id} className='flex place-content-evenly'>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>)
        })}
      </div>
    </div>
  )
}