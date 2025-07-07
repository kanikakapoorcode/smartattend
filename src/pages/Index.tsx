
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QrCode, Calendar, AlertTriangle, BookOpen, Plus, Settings } from 'lucide-react';
import AttendanceRing from '@/components/AttendanceRing';
import SubjectCard from '@/components/SubjectCard';
import QuickActions from '@/components/QuickActions';
import CrisisAlert from '@/components/CrisisAlert';

const Index = () => {
  // Mock data for demonstration
  const subjects = [
    {
      id: '1',
      name: 'Computer Networks',
      code: 'CS301',
      attended: 22,
      total: 28,
      threshold: 75,
      nextClass: '2025-01-08T10:00:00Z'
    },
    {
      id: '2', 
      name: 'Database Systems',
      code: 'CS302',
      attended: 18,
      total: 25,
      threshold: 75,
      nextClass: '2025-01-08T14:00:00Z'
    },
    {
      id: '3',
      name: 'Software Engineering',
      code: 'CS303',
      attended: 15,
      total: 24,
      threshold: 75,
      nextClass: '2025-01-09T09:00:00Z'
    }
  ];

  const overallAttendance = Math.round(
    (subjects.reduce((acc, subj) => acc + subj.attended, 0) / 
     subjects.reduce((acc, subj) => acc + subj.total, 0)) * 100
  );

  const criticalSubjects = subjects.filter(subj => 
    (subj.attended / subj.total) * 100 < subj.threshold
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SmartAttend</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Student Portal
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Crisis Alerts */}
        {criticalSubjects.length > 0 && (
          <div className="mb-8">
            <CrisisAlert subjects={criticalSubjects} />
          </div>
        )}

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Attendance */}
          <Card className="lg:col-span-1 bg-white/60 backdrop-blur-sm border-blue-200">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-gray-700">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <AttendanceRing 
                percent={overallAttendance} 
                size="large"
                threshold={75}
              />
              <p className="text-sm text-gray-600 mt-2">
                {subjects.reduce((acc, subj) => acc + subj.attended, 0)} of{' '}
                {subjects.reduce((acc, subj) => acc + subj.total, 0)} classes attended
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{subjects.length}</div>
                  <div className="text-sm text-gray-600">Subjects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {subjects.filter(s => (s.attended/s.total)*100 >= s.threshold).length}
                  </div>
                  <div className="text-sm text-gray-600">Safe</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {subjects.filter(s => {
                      const pct = (s.attended/s.total)*100;
                      return pct < s.threshold && pct >= s.threshold-10;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">Warning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {subjects.filter(s => (s.attended/s.total)*100 < s.threshold-10).length}
                  </div>
                  <div className="text-sm text-gray-600">Critical</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Subjects Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Subjects</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>

        {/* Empty State for New Users */}
        {subjects.length === 0 && (
          <Card className="text-center py-12 bg-white/60 backdrop-blur-sm border-blue-200">
            <CardContent>
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No subjects added yet
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first subject to start tracking attendance
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Subject
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
