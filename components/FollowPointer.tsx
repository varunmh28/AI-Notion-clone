import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const color = stringToColor(info.email || "1");
  const label = info.name?.trim() || info.email || "Guest";

  return (
    <motion.div
      className="pointer-events-none absolute z-50 flex flex-col items-start"
      style={{ top: y, left: x }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        className="pointer-events-none h-6 w-6 -scale-x-100 rotate-[20deg]"
        stroke={color}
        fill={color}
        strokeWidth={1}
        viewBox="0 0 16 16"
        width={24}
        height={24}
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>

      <motion.div
        className="mt-1 max-w-[180px] truncate rounded-full bg-neutral-200 px-2 py-1 text-xs font-bold text-black"
        style={{ backgroundColor: `${color}33` }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;