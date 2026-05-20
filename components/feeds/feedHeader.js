import { MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function FeedHeader() {
  return (
    <header className="p-4 flex items-center justify-between text-center sticky top-0 bg-[#071029] z-30">
      <h1 className="text-2xl text-white">Home</h1>
      <div className="flex gap-3">
        <MdOutlineLightMode className="w-6 h-6 text-white" />

        <CgProfile className=" w-6 h-6 text-white" />
      </div>
    </header>
  );
}
