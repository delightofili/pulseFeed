//import Image from "next/image";

import NavLink from "../ui/nav-link";

export default function AddPost() {
  return (
    <div>
      <div className="m-4 border rounded-xl bg-[#212f5b75] border-neutral-800 relative">
        <div className=" grid grid-cols-[60px_1fr]">
          <div className="bg-neutral-700 border-r-neutral-800">
            <div
              /* src=""
              alt="User avatar" */
              /* width={40}
              height={40} */
              className="w-10 h-10 rounded-full object-cover bg-green-200"
            />
          </div>
          <div>
            <div className="flex items-center text-center gap-x-2">
              <input type="text" placeholder="What's happening?" />
            </div>
            <div className="flex justify-between p-4">
              <div className="grid grid-cols-4 items-center text-center pt-3 w-[90%] text-[#64748B]">
                <div className="flex gap-1 items-center">
                  <p className="text-sm">IM</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-sm">GIF</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white p-2">Post</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-2 ml-10 gap-6 text-[12px] font-bold">
        <NavLink className="text-white" href="?tab=for-you">
          For You
        </NavLink>
        <NavLink href="?tab=following" className="text-white">
          Following
        </NavLink>
      </div>
    </div>
  );
}
