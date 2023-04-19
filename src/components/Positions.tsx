import { Position } from "@prisma/client"

interface props{
  position: Position;
  key: string;
}
export default function Positions({ position }: props){
  console.log(position)
  return(
    <div>
      <div className=" flex place-content-evenly space-x-5">
        <p>{position.name}</p>
      </div>
    </div>
  )
}