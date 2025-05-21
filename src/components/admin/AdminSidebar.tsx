
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  BarChart2, 
  Settings, 
  Users 
} from 'lucide-react';

const AdminSidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
      isActive 
        ? 'bg-brand-100 text-brand-800 font-medium' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen py-6 px-3">
      <div className="px-4 mb-8">
        <h2 className="font-heading font-bold text-xl">Admin Dashboard</h2>
      </div>
      
      <nav className="space-y-1">
        <NavLink to="/admin" end className={navLinkClass}>
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/admin/products" className={navLinkClass}>
          <Package className="h-5 w-5" />
          <span>Products</span>
        </NavLink>
        
        <NavLink to="/admin/analytics" className={navLinkClass}>
          <BarChart2 className="h-5 w-5" />
          <span>Analytics</span>
        </NavLink>
        
        <NavLink to="/admin/users" className={navLinkClass}>
          <Users className="h-5 w-5" />
          <span>Users</span>
        </NavLink>
        
        <NavLink to="/admin/settings" className={navLinkClass}>
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
