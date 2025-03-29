import { ReactNode } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
  lowStock?: number;
  iconColor: string;
  valueColor?: string;
  onClick?: () => void;

  // Add this line to support onClick
}

const StatsCard = ({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  onClick,
  valueColor = "text-gray-800",
}: StatsCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center p-4 bg-white rounded-md shadow-md w-64"
    >
      <div className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <ArrowUpRightIcon className="w-4 h-4" />
      </div>

      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${iconBgColor}`}
      >
        <div className={`w-5 h-5 ${iconColor}`}>{icon}</div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
