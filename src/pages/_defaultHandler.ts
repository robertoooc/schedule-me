import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

// export default function defaultHandler<ReqType, ResType>() {
//   return nextConnect<ReqType, ResType>({
//     attachParams: true,
//     onError: (err, req, res) => {
//       console.error(err);

//       (res as unknown as NextApiResponse)
//       .status(500)
//       .json({ error: "Internal Server Error" });
//     },
//   });
// }
const defaultHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextApiHandler
) => {
  console.log(req.cookies?.token, "here");
  
  next(req,res)
};
export default defaultHandler;
