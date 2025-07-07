
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, Calendar, X } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  attended: number;
  total: number;
  threshold: number;
}

interface CrisisAlertProps {
  subjects: Subject[];
}

const CrisisAlert: React.FC<CrisisAlertProps> = ({ subjects }) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed || subjects.length === 0) return null;

  const criticalCount = subjects.filter(s => 
    (s.attended / s.total) * 100 < s.threshold - 10
  ).length;

  const warningCount = subjects.length - criticalCount;

  return (
    <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-red-800">
                Attendance Alert
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDismissed(true)}
                className="text-red-600 hover:text-red-800 hover:bg-red-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-red-700 mb-3">
              {criticalCount > 0 && (
                <>You have {criticalCount} subject{criticalCount > 1 ? 's' : ''} in critical status. </>
              )}
              {warningCount > 0 && (
                <>
                  {criticalCount > 0 ? 'Additionally, ' : 'You have '}
                  {warningCount} subject{warningCount > 1 ? 's need' : ' needs'} attention.
                </>
              )}
            </p>

            <div className="space-y-2 mb-4">
              {subjects.slice(0, 3).map((subject) => {
                const percentage = Math.round((subject.attended / subject.total) * 100);
                const isCritical = percentage < subject.threshold - 10;
                
                return (
                  <div 
                    key={subject.id}
                    className="flex items-center justify-between p-2 bg-white/60 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingDown className={`w-4 h-4 ${isCritical ? 'text-red-500' : 'text-orange-500'}`} />
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {subject.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {subject.attended}/{subject.total} classes
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className={isCritical ? 'border-red-300 text-red-700' : 'border-orange-300 text-orange-700'}
                      >
                        {percentage}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
              
              {subjects.length > 3 && (
                <div className="text-sm text-gray-600 text-center py-2">
                  +{subjects.length - 3} more subjects need attention
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Action Plan
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Mark Present Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrisisAlert;
