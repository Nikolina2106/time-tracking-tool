export interface ITimeTracker {
    id?: string;
    timeLogged: number;
    description: string;
    userId: string;
    createdAt?: Date;
}
