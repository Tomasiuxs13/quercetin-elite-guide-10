
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdminNavCardProps {
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  metric?: string | number;
}

const AdminNavCard: React.FC<AdminNavCardProps> = ({ 
  title, 
  description, 
  to, 
  icon, 
  badge,
  metric 
}) => {
  return (
    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
      <Link to={to} className="block p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {icon}
        </div>
        {metric !== undefined && (
          <div className="text-3xl font-bold mb-2">{metric}</div>
        )}
        {badge && (
          <div className="mb-2">
            <Badge variant={badge.variant || "secondary"} className={
              badge.variant === "secondary" ? "bg-amber-100 hover:bg-amber-200 text-amber-800" : ""
            }>
              {badge.text}
            </Badge>
          </div>
        )}
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </Link>
    </Card>
  );
};

export default AdminNavCard;
