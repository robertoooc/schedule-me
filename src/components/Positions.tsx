import { Position } from "@prisma/client";
import { useState } from "react";
import axios from "redaxios";
import { useRouter } from "next/router";
interface props {
  positions: Position[];
}
export default function Positions({ positions }: props) {
  const [createPosition, setCreatePosition] = useState(false);
  const [positionName, setPositionName] = useState("");
  const router = useRouter();
  const submitForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/position", { positionName });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createPositionForm = createPosition ? (
    <form onSubmit={submitForm}>
      <label>Position Name</label>
      <input
        type="text"
        autoComplete="off"
        onChange={(e) => setPositionName(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  ) : null;
  return (
    <div>
      <p className="text-center bg-slate-300 text-lg">Employees</p>
      <div>
        {positions.map((position) => {
          return (
            <div key={position.id} className="flex place-content-evenly">
              <p onClick={() => router.push(`/position?id=${position.id}`)}>
                {position.name}
              </p>
            </div>
          );
        })}
      </div>
      <button onClick={() => setCreatePosition(!createPosition)}>
        Create Position
      </button>
      {createPositionForm}
    </div>
  );
}
