// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const crypto = require("crypto");
import KJUR from "jsrsasign";
// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;

  const oHeader = { alg: "HS256", typ: "JWT" };

  const oPayload = {
    sdkKey: process.env.NEXT_PUBLIC_ZOOM_API_KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: process.env.NEXT_PUBLIC_ZOOM_API_KEY,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const signature = KJUR.jws.JWS.sign(
    "HS256",
    sHeader,
    sPayload,
    process.env.ZOOM_API_SECRET
  );

  res.status(200).json({
    signature,
  });
};
