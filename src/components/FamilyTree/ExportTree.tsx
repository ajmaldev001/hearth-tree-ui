
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileImage, FileText, Share2 } from 'lucide-react';
import { toast } from "sonner";
import { FamilyData } from '../../types/family';

interface ExportTreeProps {
  familyData: FamilyData;
}

const ExportTree = ({ familyData }: ExportTreeProps) => {
  const exportAsPDF = () => {
    // Create a simplified PDF export
    const content = `
      ${familyData.head.firstName} ${familyData.head.lastName} Family Tree
      
      Head of Family:
      Name: ${familyData.head.firstName} ${familyData.head.lastName}
      Email: ${familyData.head.email}
      Phone: ${familyData.head.phoneNumber}
      Address: ${familyData.head.streetName}, ${familyData.head.city}, ${familyData.head.state}
      Samaj: ${familyData.head.samajName}
      ${familyData.templeAssociation ? `Temple: ${familyData.templeAssociation}` : ''}
      
      Family Members:
      ${familyData.members.map(member => `
      - ${member.firstName} ${member.lastName}
        Relationship: ${member.relationWithHead}
        Age: ${member.age}
        ${member.phoneNumber ? `Phone: ${member.phoneNumber}` : ''}
        ${member.email ? `Email: ${member.email}` : ''}
      `).join('\n')}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${familyData.head.firstName}_${familyData.head.lastName}_FamilyTree.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Family tree exported as text file!");
  };

  const exportAsImage = () => {
    // For now, we'll create a simple text-based export
    // In a real implementation, you would use html2canvas or similar
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add title
    ctx.fillStyle = '#000000';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${familyData.head.firstName} ${familyData.head.lastName} Family Tree`, canvas.width / 2, 50);
    
    // Add family head
    ctx.font = '18px Arial';
    ctx.fillText(`Head: ${familyData.head.firstName} ${familyData.head.lastName}`, canvas.width / 2, 100);
    
    // Add family members
    ctx.font = '14px Arial';
    let yPos = 150;
    familyData.members.forEach((member, index) => {
      ctx.fillText(`${member.firstName} ${member.lastName} (${member.relationWithHead})`, canvas.width / 2, yPos + (index * 30));
    });
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${familyData.head.firstName}_${familyData.head.lastName}_FamilyTree.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Family tree exported as image!");
      }
    });
  };

  const shareTree = () => {
    const shareData = {
      title: `${familyData.head.firstName} ${familyData.head.lastName} Family Tree`,
      text: `Check out our family tree with ${familyData.members.length + 1} members!`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        toast.success("Family tree shared successfully!");
      }).catch(() => {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Family tree link copied to clipboard!");
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Family tree link copied to clipboard!");
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Export Family Tree
        </CardTitle>
        <CardDescription className="text-indigo-100">
          Download or share your family tree
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={exportAsPDF}
            className="flex flex-col items-center p-6 h-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <FileText className="w-8 h-8 mb-2" />
            <span className="font-semibold">Export as PDF</span>
            <span className="text-xs opacity-80">Text-based format</span>
          </Button>

          <Button
            onClick={exportAsImage}
            className="flex flex-col items-center p-6 h-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <FileImage className="w-8 h-8 mb-2" />
            <span className="font-semibold">Export as Image</span>
            <span className="text-xs opacity-80">PNG format</span>
          </Button>

          <Button
            onClick={shareTree}
            className="flex flex-col items-center p-6 h-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Share2 className="w-8 h-8 mb-2" />
            <span className="font-semibold">Share Tree</span>
            <span className="text-xs opacity-80">Copy link or share</span>
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Export Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Family Head: {familyData.head.firstName} {familyData.head.lastName}</p>
            <p>• Total Members: {familyData.members.length + 1}</p>
            <p>• Samaj Association: {familyData.head.samajName}</p>
            {familyData.templeAssociation && (
              <p>• Temple: {familyData.templeAssociation}</p>
            )}
            <p>• Created: {new Date(familyData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportTree;
