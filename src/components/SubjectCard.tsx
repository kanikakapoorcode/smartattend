
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import AttendanceRing from './AttendanceRing';

interface Subject {
  id: string;
  name: string;
  code: string;
  attended: number;
  total: number;
  threshold: number;
  nextClass: string;
}

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const attendancePercent = Math.round((subject.attended / subject.total) * 100);
  const isLowAttendance = attendancePercent < subject.threshold;
  const nextClassDate = new Date(subject.nextClass);
  const canSkip = ((subject.attended - 1) / (subject.total + 1)) * 100 >= subject.threshold;
  const needToAttend = Math.ceil((subject.threshold / 100) * (subject.total + 1)) - subject.attended;

  const getStatusBadge = () => {
    if (attendancePercent >= subject.threshold) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Safe</Badge>;
    } else if (attendancePercent >= subject.threshold - 10) {
      return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Warning</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg bg-white/70 backdrop-blur-sm ${
      isLowAttendance ? 'border-red-200 hover:border-red-300' : 'border-blue-200 hover:border-blue-300'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {subject.name}
            </CardTitle>
            <p className="text-sm text-gray-500 font-medium">{subject.code}</p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Attendance Progress */}
        <div className="flex items-center justify-between">
          <AttendanceRing 
            percent={attendancePercent} 
            threshold={subject.threshold}
            size="medium"
          />
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {subject.attended}/{subject.total}
            </div>
            <div className="text-sm text-gray-500">Classes</div>
          </div>
        </div>

        {/* Next Class Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Calendar className="w-4 h-4 mr-2" />
            Next Class
          </div>
          <div className="text-sm font-medium text-gray-900">
            {nextClassDate.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="text-xs text-gray-500 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {nextClassDate.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>

        {/* Attendance Insights */}
        <div className="space-y-2">
          {isLowAttendance ? (
            <div className="flex items-center text-sm text-red-600 bg-red-50 rounded-lg p-2">
              <TrendingDown className="w-4 h-4 mr-2" />
              Need {needToAttend} more classes to reach {subject.threshold}%
            </div>
          ) : canSkip ? (
            <div className="flex items-center text-sm text-green-600 bg-green-50 rounded-lg p-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              You can skip 1 class and stay above {subject.threshold}%
            </div>
          ) : (
            <div className="flex items-center text-sm text-blue-600 bg-blue-50 rounded-lg p-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Keep attending to maintain {subject.threshold}% threshold
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button 
            size="sm" 
            className={`flex-1 ${
              isLowAttendance 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Mark Present
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
