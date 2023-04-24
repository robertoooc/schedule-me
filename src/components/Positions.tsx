import { Position } from "@prisma/client"

interface props{
  positions: Position[];
}
export default function Positions({ positions }: props){
  return(
    <div>
      <p className="text-center bg-slate-300 text-lg">Employees</p>
      <div className=" flex place-content-evenly">
        <p>Name</p>
        <p>Email</p>
      </div>
      <div>
        {positions.map((position)=>{
          return(
          <div key={position.id} className='flex place-content-evenly'>
            <p>{position.name}</p>
            {/* <p>{user.email}</p> */}
          </div>)
        })}
      </div>
    </div>
  )
}