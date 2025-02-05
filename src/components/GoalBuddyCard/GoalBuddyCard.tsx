import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
} from "../ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import Modal from '../Modal/Modal';

const GoalBuddyCard: React.FC = () => {
  return (
    <div className="flex justify-center flex-wrap content-around gap-5 max-w-[1200px]">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card
          key={index}
          className="flex flex-col items-center w-1/5 max-w-[250px] h-[250px] m-4 bg-[#AAAAAA]"
        >
          <CardHeader className="pb-0">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-[#D9D9D9]" />
            </Avatar>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-11/12 p-4">
            <div className="h-[8px] bg-[#757575] w-full mt-1.5 mb-1 rounded-xl"></div>
            <div className="h-[8px] bg-[#757575] w-10/12 mt-1.5 mb-1 rounded-xl"></div>
            <div className="h-[8px] bg-[#757575] w-7/12 mt-1.5 mb-1 rounded-xl"></div>
            <div className="h-[8px] bg-[#757575] w-8/12 mt-1.5 mb-1 rounded-xl"></div>
            <div>
              <Modal />
            </div>
            <div className="h-[8px] bg-[#757575] w-7/12 mt-1.5 mb-1 rounded-xl"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GoalBuddyCard;
