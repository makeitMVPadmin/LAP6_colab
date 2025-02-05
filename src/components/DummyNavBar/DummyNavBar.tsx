import React from 'react';

import {
  Avatar,
  AvatarFallback,
} from "../ui/avatar";

const DummyNavBar: React.FC = () => {
  return (
    <div className="h-[120px] mb-4 bg-[#EEEEEE]">
      <div className="flex flex-row justify-between evenly h-2/4 p-2">
        <div className="w-3/12 h-4 ml-3 mt-6 mb-4 bg-[#757575]"></div>
        <Avatar className="w-12 h-12 mt-2 mr-2">
          <AvatarFallback className="bg-[#D9D9D9]" />
        </Avatar>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
      </div>
    </div>
  );
};

export default DummyNavBar;
