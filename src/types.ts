export enum SortColumn {
  NAME = "NAME",
  START_DATE = "START_DATE",
  END_DATE = "END_DATE",
  PROCEDURE = "PROCEDURE",
  SURGEON = "SURGEON",
  PROVIDER = "PROVIDER",
  ADHERENCE = "ADHERENCE",
  ROM = "ROM",
}

export const enum SortColumnPosition {
  UP = "UP",
  DOWN = "DOWN",
}

export interface SortOrder {
  column: SortColumn | null;
  sort: SortColumnPosition | null;
}

export enum PatientState {
  COMPLETED = "COMPLETED",
  CREATED = "CREATED",
  REGISTERED = "REGISTERED",
  ONBOARDED = "ONBOARDED",
  INACTIVE = "INACTIVE",
}

export interface IPatient {
  _id: string;
  provider: Provider;
  name: string;
  email: string;
  dateOfSurgery?: string;
  state: string;
  stats: Stats;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  onboardedAt?: string;
  settings: Settings;
  recoveryProtocol?: RecoveryProtocol;
  dailyTableTrackingMarked: boolean;
  durationType?: string;
  currentProtocol: CurrentProtocol;
  adherenceValue: string[];
  romValue: string[];
  prehabProtocol?: PrehabProtocol;
}

export interface Provider {
  _id: string;
  name: string;
  email: string;
  organization: string;
  category: string;
}

export interface Stats {
  _id: string;
  adherence: Adherence;
  rom: Rom[];
  createdAt: string;
  updatedAt: string;
}

export interface Adherence {
  total: number;
  completed: number;
  partial: number;
  skipped: number;
  missed: number;
  avgCompleteSeconds: number;
  repCount: number;
  timeCount: number;
  percentage?: number;
  percentile: number;
  trend?: number;
}

export interface Rom {
  bestAngle: number;
  exerciseCode: string;
  trend: number;
  _id: string;
}

export interface Settings {
  autoShowTutorial: boolean;
  autoNextExercise: boolean;
  autoFullScreen: boolean;
  reminderNotifications: boolean;
  timeBetweenExercises: number;
  saveExerciseVideo: boolean;
  darkTheme: boolean;
  isTestAccount: boolean;
  useDetectors: string[];
  graceDays?: number[];
  audioGuidance?: boolean;
  enableChat?: boolean;
  enableSMS?: boolean;
}

export interface RecoveryProtocol {
  code: string;
  startDate: string;
  completionDate: string;
  surgeryPart: string;
  surgeryType: string;
  surgerySide: string;
  surgeryProcedure: string;
  ROMGoals: {
    week: number;
    goal: number;
    _id: string;
    code?: string;
  }[];
  adherenceGoals?: {
    warningLevel: number;
  };
}

export interface CurrentProtocol {
  code: string;
  startDate: string;
  completionDate: string;
  surgeryPart: string;
  surgeryProcedure: string;
  surgerySide: string;
  surgeryType: string;
  ROMGoals: {
    week: number;
    goal: number;
    _id: string;
    code?: string;
  }[];
  adherenceGoals?: {
    warningLevel: number;
  };
}

export interface PrehabProtocol {
  code: string;
  startDate: string;
  completionDate: string;
  surgeryPart: string;
  surgeryType: string;
  surgerySide: string;
  surgeryProcedure: string;
  ROMGoals: {
    week: number;
    goal: number;
    _id: string;
  }[];
  adherenceGoals?: {
    warningLevel: number;
  };
}
