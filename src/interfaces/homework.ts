import { Topic } from './topic';

export enum HomeworkType {
  VideoCourse = 0,
  PracticeCourse = 1,
  Unknown = 2,
  Exam = 3,
}

export interface Homework {
  id: string;
  type: HomeworkType;

  name: string;

  stageId: number;
  subjectId: number;
  publisherId: number;
  semesterId: number;
  specialCourseId: string;
  taskDetailId: string;

  judgmentMethod: string;

  createdTime: Date;
  expiredTime: Date;
  startTime: Date;
  startDate: Date;

  remainingDuration: number;
  duration: number;

  leaveMessage: string;

  creator: string;

  source: string;
  state: number;

  showWarnExpiredTime: boolean;

  roomStudentTotal: number;
  finishedStudentTotal: number;

  itemCount: number;
  finishedItemCount: number;

  accuracy: number;

  topics: Topic[];

  subsections: any[]; // unknown yet

  mode: number;
  isLimitedTime: boolean;
  examStatus: string;
}

export interface HomeworkResponse {
  homeworkList: Homework[];
}
