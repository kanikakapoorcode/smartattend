
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Calendar, Plus, BookOpen, Scan, FileText } from 'lucide-react';
import QrScanner from './QrScanner';

const QuickActions: React.FC = () => {
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleQrScan = (data: string) => {
    console.log('QR Code scanned:', data);
    // Here you would process the QR code data
    setScannerOpen(false);
  };

  const quickActions = [
    {
      icon: QrCode,
      title: 'Scan QR Code',
      description: 'Mark attendance via QR',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => setScannerOpen(true)
    },
    {
      icon: Plus,
      title: 'Manual Entry',
      description: 'Add attendance manually',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Manual entry')
    },
    {
      icon: Calendar,
      title: 'View Schedule',
      description: 'Check class timetable',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => console.log('View schedule')
    },
    {
      icon: FileText,
      title: 'Reports',
      description: 'Generate attendance reports',
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => console.log('Reports')
    }
  ];

  return (
    <>
      <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700 flex items-center">
            <Scan className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105 border-gray-200 hover:border-gray-300 bg-white/50 hover:bg-white/80`}
                onClick={action.action}
              >
                <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm text-gray-900">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QR Scanner Dialog */}
      <Dialog open={scannerOpen} onOpenChange={setScannerOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <QrScanner onScan={handleQrScan} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActions;
