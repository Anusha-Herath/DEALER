import React from "react";

function CalendarCard({ data }) {
  console.log("CalendarCard data", data);
  return (
    <div className="grid grid-cols-5 gap-4 p-5">
      {data.map((item, index) => {
        return (
          <div className="p-4 text-2xl bg-white h-35 rounded-2xl" key={index}>
            <div className={`w-10 h-10 ${item.color} rounded-md`}></div>
            <p className="font-bold text-gray-900 text-[20px] mt-8">
              {item.month}
            </p>
            <p className=" text-gray-400 text-[15px] mt-1">
              {item.events} Events
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarCard;
