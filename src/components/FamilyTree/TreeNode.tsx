
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, Edit, Trash2, Plus } from 'lucide-react';

interface TreeNodeProps {
  id: string;
  name: string;
  relationship: string;
  phone?: string;
  age?: string;
  isHead?: boolean;
  isCurrentUser?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  showAddButton?: boolean;
}

const TreeNode = ({ 
  id, 
  name, 
  relationship, 
  phone, 
  age, 
  isHead, 
  isCurrentUser,
  onEdit, 
  onDelete, 
  onAdd,
  showAddButton 
}: TreeNodeProps) => {
  const getNodeColor = () => {
    if (isCurrentUser) return 'from-blue-500 to-cyan-500 border-2 border-blue-400';
    if (isHead) return 'from-blue-600 to-purple-600';
    switch (relationship) {
      case 'spouse': return 'from-pink-500 to-red-500';
      case 'parent': return 'from-green-600 to-emerald-600';
      case 'child': return 'from-yellow-500 to-orange-500';
      case 'sibling': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="relative group">
      <div className={`
        w-32 h-20 rounded-2xl bg-gradient-to-br ${getNodeColor()} 
        shadow-lg hover:shadow-xl transition-all duration-300 
        flex flex-col items-center justify-center text-white p-2
        hover:scale-105 cursor-pointer
      `}>
        <div className="flex items-center space-x-1 mb-1">
          <User className="w-4 h-4" />
          {age && <span className="text-xs bg-white/20 px-1 rounded">{age}</span>}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold truncate w-full">{name}</p>
          <p className="text-xs opacity-80 capitalize">{relationship}</p>
        </div>
        
        {/* Edit/Delete buttons for family head */}
        {!isCurrentUser && (
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
            {onEdit && (
              <Button
                size="sm"
                variant="secondary"
                className="w-6 h-6 p-0 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
              >
                <Edit className="w-3 h-3" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                className="w-6 h-6 p-0 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Add button */}
      {showAddButton && onAdd && (
        <Button
          size="sm"
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 p-0 rounded-full bg-green-500 hover:bg-green-600"
          onClick={onAdd}
        >
          <Plus className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default TreeNode;
