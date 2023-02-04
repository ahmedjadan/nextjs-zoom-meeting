import { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

const NewPlayer = ({ meetingNumber, passWord, userName, userEmail }) => {
  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  const signatureEndpoint = "/api/signature";

  const apiKey = process.env.NEXT_PUBLIC_ZOOM_API_KEY;
  const role = 0;
  const leaveUrl = process.env.NEXT_PUBLIC_CURRENT_DOMAIN;

  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }, []);

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function startMeeting(signature) {
    let meetingSDKElement = document.getElementById("meetingSDKElement");
    const client = ZoomMtgEmbedded.createClient();
    // document.getElementById("zmmtg-root").style.display = "block";

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      sdkKey: process.env.NEXT_PUBLIC_ZOOM_API_KEY,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: "zat",
      userEmail: "ah.jadan7@gmail.com",
      //tk: registrantToken,
    });
  }

  return (
    <div>
      <h1>Zoom WebSDK Sample React</h1>
      <div id="meetingSDKElement">
        {/* Zoom Meeting SDK Component View Rendered Here */}
      </div>
      <button onClick={getSignature}>Join Meeting</button>
    </div>
  );
};

export default NewPlayer;
