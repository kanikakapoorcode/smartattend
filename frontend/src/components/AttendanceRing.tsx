
import React from 'react';
import { cn } from '@/lib/utils';

interface AttendanceRingProps {
  percent: number;
  threshold?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AttendanceRing: React.FC<AttendanceRingProps> = ({ 
  percent, 
  threshold = 75, 
  size = 'medium',
  className 
}) => {
  const getStatus = () => {
    if (percent >= threshold) return 'safe';
    if (percent >= threshold - 10) return 'warning';
    return 'danger';
  };

  const status = getStatus();
  
  const statusColors = {
    safe: '#10B981',
    warning: '#F59E0B', 
    danger: '#EF4444'
  };

  const sizes = {
    small: { container: 'w-12 h-12', text: 'text-xs' },
    medium: { container: 'w-16 h-16', text: 'text-sm' },
    large: { container: 'w-24 h-24', text: 'text-lg' }
  };

  const circumference = 2 * Math.PI * 15.9155;
  const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;

  return (
    <div className={cn("relative", sizes[size].container, className)}>
      <svg 
        viewBox="0 0 36 36" 
        className="absolute inset-0 w-full h-full transform -rotate-90"
      >
        {/* Background circle */}
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={statusColors[status]}
          strokeWidth="3"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: status === 'danger' ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))' : 'none'
          }}
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn(
          "font-bold transition-colors duration-300",
          sizes[size].text,
          status === 'safe' && "text-green-600",
          status === 'warning' && "text-orange-600", 
          status === 'danger' && "text-red-600"
        )}>
          {Math.round(percent)}%
        </span>
      </div>
      
      {/* Pulsing animation for critical attendance */}
      {status === 'danger' && (
        <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
      )}
    </div>
  );
};

export default AttendanceRing;
