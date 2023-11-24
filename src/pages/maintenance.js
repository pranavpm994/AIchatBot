import Image from "next/image";
import backgroudPic from "../images/9117392.jpg";
export default function Redirect() {
  return (
    <div>
      {/* <Image
    src={backgroudPic}
    alt="Picture of the author"
    // width={500} automatically provided
    // height={500} automatically provided
    // blurDataURL="data:..." automatically provided
    // placeholder="blur" // Optional blur-up while loading
  />
        <div
        style={{
          // use absolute position for the child element
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // use higher zIndex than the image
          zIndex: 1,
          // background: "yellow",
          // padding: "30px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
        }}
      >

      </div> */}
      <div className="flex bg-gradient-to-r from-blue-700 to-white-400 h-[calc(100dvh)] flex-col items-center">
        <div className="flex">
          <h1 className="bg-gradient-to-r from-blue-900 to-red-900 text-center text-transparent bg-clip-text w-screen py-3 font-bold text-6xl">
            botAI
          </h1>
        </div>
        <div className="flex w-screen">
          <h1 className="text-left p-8 font-Helvetica font-bold text-white text-4xl">
            Under Maintenance.
          </h1>
        </div>
      </div>
    </div>
  );
}
