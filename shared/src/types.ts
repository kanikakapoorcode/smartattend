import { z } from 'zod';

// User types
export const UserRoleSchema = z.enum(['student', 'professor', 'admin']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleSchema,
  studentId: z.string().optional(),
  department: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
export type User = z.infer<typeof UserSchema>;

// Subject types
export const SubjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  professorId: z.string(),
  totalClasses: z.number(),
  minimumAttendance: z.number().default(75),
  createdAt: z.date(),
  updatedAt: z.date()
});
export type Subject = z.infer<typeof SubjectSchema>;

// Attendance types
export const AttendanceStatusSchema = z.enum(['present', 'absent', 'late', 'excused']);
export type AttendanceStatus = z.infer<typeof AttendanceStatusSchema>;

export const AttendanceRecordSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  subjectId: z.string(),
  date: z.date(),
  status: AttendanceStatusSchema,
  recordedBy: z.string(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;

// Attendance summary types
export const AttendanceSummarySchema = z.object({
  studentId: z.string(),
  subjectId: z.string(),
  totalClasses: z.number(),
  attendedClasses: z.number(),
  attendancePercentage: z.number(),
  status: z.enum(['safe', 'warning', 'critical']),
  lastUpdated: z.date()
});
export type AttendanceSummary = z.infer<typeof AttendanceSummarySchema>;

// QR Code types
export const QRCodeSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  professorId: z.string(),
  expiresAt: z.date(),
  isActive: z.boolean(),
  createdAt: z.date()
});
export type QRCode = z.infer<typeof QRCodeSchema>;

// API Response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  error: z.string().optional()
});
export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

// Crisis mode types
export const CrisisPlanSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  subjectId: z.string(),
  currentAttendance: z.number(),
  requiredAttendance: z.number(),
  remainingClasses: z.number(),
  plan: z.array(z.object({
    action: z.string(),
    description: z.string(),
    priority: z.enum(['high', 'medium', 'low'])
  })),
  createdAt: z.date()
});
export type CrisisPlan = z.infer<typeof CrisisPlanSchema>; 