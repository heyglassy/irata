// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1425055",
  key: "dc3c112895a3d6903168",
  secret: "f8d86ad278df9c400017",
  cluster: "us3",
  useTLS: true,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const authReponse = pusher.authenticate(socketId, channel);
  res.send(authReponse);
}
