
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreePalm, User, ArrowLeft, Heart, Users } from 'lucide-react';

interface FamilyData {
  head: {
    name: string;
    email: string;
    phone: string;
    familyName: string;
  };
  members: Array<{
    id: string;
    name: string;
    relationship: string;
    age: string;
    email: string;
    phone: string;
  }>;
}

interface TreeNode {
  id: string;
  name: string;
  relationship: string;
  age?: string;
  level: number;
  isHead?: boolean;
}

const FamilyTree = ({ familyData, onBack }: { familyData: FamilyData; onBack: () => void }) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [animatedNodes, setAnimatedNodes] = useState<Set<string>>(new Set());

  // Organize family members into tree structure
  const organizeTreeData = () => {
    const nodes: TreeNode[] = [];
    
    // Add family head
    const headNode: TreeNode = {
      id: 'head',
      name: familyData.head.name,
      relationship: 'Head',
      level: 1,
      isHead: true
    };
    nodes.push(headNode);

    // Organize members by relationship type
    const spouses = familyData.members.filter(m => m.relationship === 'spouse');
    const parents = familyData.members.filter(m => m.relationship === 'parent');
    const children = familyData.members.filter(m => m.relationship === 'child');
    const siblings = familyData.members.filter(m => m.relationship === 'sibling');
    const grandparents = familyData.members.filter(m => m.relationship === 'grandparent');
    const grandchildren = familyData.members.filter(m => m.relationship === 'grandchild');
    const others = familyData.members.filter(m => !['spouse', 'parent', 'child', 'sibling', 'grandparent', 'grandchild'].includes(m.relationship));

    // Add nodes by level
    grandparents.forEach(member => nodes.push({...member, level: 0}));
    parents.forEach(member => nodes.push({...member, level: 0}));
    spouses.forEach(member => nodes.push({...member, level: 1}));
    siblings.forEach(member => nodes.push({...member, level: 1}));
    children.forEach(member => nodes.push({...member, level: 2}));
    grandchildren.forEach(member => nodes.push({...member, level: 3}));
    others.forEach(member => nodes.push({...member, level: 1}));

    return nodes;
  };

  const treeNodes = organizeTreeData();
  const nodesByLevel = treeNodes.reduce((acc: any, node) => {
    if (!acc[node.level]) acc[node.level] = [];
    acc[node.level].push(node);
    return acc;
  }, {});

  // Animate nodes on mount
  useEffect(() => {
    const animateNodes = async () => {
      for (let level = 0; level <= 3; level++) {
        if (nodesByLevel[level]) {
          for (const node of nodesByLevel[level]) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setAnimatedNodes(prev => new Set(prev).add(node.id));
          }
        }
      }
    };
    animateNodes();
  }, []);

  const getNodeColor = (relationship: string, isHead?: boolean) => {
    if (isHead) return 'from-blue-600 to-purple-600';
    switch (relationship) {
      case 'spouse': return 'from-pink-500 to-red-500';
      case 'parent': return 'from-green-600 to-emerald-600';
      case 'child': return 'from-yellow-500 to-orange-500';
      case 'sibling': return 'from-indigo-500 to-purple-500';
      case 'grandparent': return 'from-gray-600 to-gray-700';
      case 'grandchild': return 'from-teal-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const NodeComponent = ({ node }: { node: TreeNode }) => {
    const isAnimated = animatedNodes.has(node.id);
    const isSelected = selectedNode?.id === node.id;
    
    return (
      <div
        className={`
          relative transition-all duration-500 transform cursor-pointer
          ${isAnimated ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4'}
          ${isSelected ? 'scale-110 z-10' : 'hover:scale-105'}
        `}
        onClick={() => setSelectedNode(node)}
      >
        <div className={`
          w-32 h-32 rounded-full bg-gradient-to-br ${getNodeColor(node.relationship, node.isHead)}
          shadow-2xl flex flex-col items-center justify-center text-white
          transition-all duration-300 hover:shadow-3xl
          ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}
        `}>
          <User className="w-8 h-8 mb-2" />
          <span className="text-sm font-semibold text-center px-2 leading-tight">
            {node.name.split(' ')[0]}
          </span>
          <span className="text-xs opacity-80 capitalize">{node.relationship}</span>
        </div>
        
        {/* Connection lines */}
        {node.level > 0 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
        )}
        
        {/* Animated heart for head */}
        {node.isHead && (
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {familyData.head.familyName} Family Tree
            </h1>
            <p className="text-gray-600">Interactive family relationship visualization</p>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>{treeNodes.length} Members</span>
          </div>
        </div>

        {/* Tree Visualization */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Tree levels */}
              {Object.entries(nodesByLevel).map(([level, nodes]: [string, TreeNode[]]) => (
                <div key={level} className="flex justify-center items-center mb-16 relative">
                  {/* Level label */}
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold text-gray-400">
                    {level === '0' && 'Ancestors'}
                    {level === '1' && 'Current'}
                    {level === '2' && 'Children'}
                    {level === '3' && 'Grandchildren'}
                  </div>
                  
                  {/* Nodes */}
                  <div className="flex justify-center items-center space-x-8 flex-wrap gap-y-8">
                    {nodes.map((node, index) => (
                      <div key={node.id} className="relative">
                        <NodeComponent node={node} />
                        
                        {/* Horizontal connections between siblings */}
                        {index < nodes.length - 1 && (
                          <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Vertical connection to next level */}
                  {parseInt(level) < 3 && nodesByLevel[parseInt(level) + 1] && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getNodeColor(selectedNode.relationship, selectedNode.isHead)} flex items-center justify-center`}>
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedNode.name}</h3>
                  <p className="text-gray-600 capitalize">{selectedNode.relationship} of {familyData.head.familyName} Family</p>
                </div>
              </div>
              
              {selectedNode.age && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <span className="font-semibold">Age:</span> {selectedNode.age} years old
                  </p>
                </div>
              )}
              
              {selectedNode.isHead && (
                <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-gray-700 flex items-center">
                    <TreePalm className="w-5 h-5 mr-2 text-yellow-600" />
                    <span className="font-semibold">Family Head</span> - Primary contact and family leader
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Relationship Legend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { relationship: 'Head', color: 'from-blue-600 to-purple-600' },
                { relationship: 'Spouse', color: 'from-pink-500 to-red-500' },
                { relationship: 'Parent', color: 'from-green-600 to-emerald-600' },
                { relationship: 'Child', color: 'from-yellow-500 to-orange-500' },
                { relationship: 'Sibling', color: 'from-indigo-500 to-purple-500' },
                { relationship: 'Grandparent', color: 'from-gray-600 to-gray-700' },
                { relationship: 'Grandchild', color: 'from-teal-500 to-cyan-500' },
                { relationship: 'Other', color: 'from-gray-500 to-gray-600' }
              ].map((item) => (
                <div key={item.relationship} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color}`} />
                  <span className="text-sm font-medium text-gray-700">{item.relationship}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyTree;
