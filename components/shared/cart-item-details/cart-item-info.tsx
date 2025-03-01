import React from "react";

interface ICartItemInfoProps {
  name: string;
  details: string;
}

export const CartItemInfo: React.FC<ICartItemInfoProps> = ({ name, details }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className="text-xs text-gray-400">{details}</p>
    </div>
  );
};
