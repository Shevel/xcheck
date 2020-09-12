export interface IGithubInfo {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  name: string;
  html_url: string;
}

export enum Endpoint {
  users = 'users',
  tasks = 'tasks',
  checkSessions = 'checkSessions',
  reviewRequests = 'reviewRequests',
  reviews = 'reviews',
}

export type DataTypes = IUser | ITask | ICheckSession | IReviewRequest | IReview;

export enum UserRole {
  author = 'author',
  student = 'student',
  supervisor = 'supervisor',
  courseManager = 'course_manager',
}

export interface IUser {
  id: string;
  githubId: string;
  roles: UserRole[];
}

export interface ITask {
  id: string;
  author: string;
  state: TaskState;
  categoriesOrder: TaskCategory[];
  items: ITaskItem[];
}

export enum TaskState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum TaskCategory {
  Basic = 'Basic Scope',
  Extra = 'Extra Scope',
  Fines = 'Fines',
}

export interface ITaskItem {
  id: string;
  minScore: number;
  maxScore: number;
  category: TaskCategory;
  title: string;
  description: string;
}

export interface ICheckSession {
  id: string;
  state: CrossCheckSessionState;
  taskId: string;
  coefficient: number;
  startDate: Date;
  endDate: Date;
  discardMinScore: true;
  discardMaxScore: false;
  minReiewsAmount: number;
  desiredReviewersAmount: number;
  attendees: ICheckSessionAttendee[];
}

export enum CrossCheckSessionState {
  DRAFT = 'DRAFT',
  REQUESTS_GATHERING = 'REQUESTS_GATHERING',
  CROSS_CHECK = 'CROSS_CHECK',
  COMPLETED = 'COMPLETED',
}

export interface ICheckSessionAttendee {
  githubId: string;
  reviewOf: string[];
}

export interface IReviewRequest {
  id: string;
  crossCheckSessionId: string;
  author: string;
  task: string;
  state: ReviewRequestState;
  selfGrade: object;
}

export enum ReviewRequestState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
}

export interface IReview {
  id: string;
  requestId: string;
  author: string;
  state: ReviewState;
  grade: ITaskScore;
}

export interface ITaskScore {
  task: string;
  items: ITaskScoreItem;
}

export interface ITaskScoreItem {
  [index: string]: {
    score: number;
    comment: string;
  };
}

export enum ReviewState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DISPUTED = 'DISPUTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface IDispute {
  reviewId: string;
  state: DisputeState;
  idem: string;
  comment: string;
  suggestedScore: number;
}

export enum DisputeState {
  ONGOING = 'ONGOING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}