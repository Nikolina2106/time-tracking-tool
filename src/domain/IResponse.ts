import {IValidationError} from './IValidationError';
import {ITimeTracker} from './ITracker';

export interface IResponse {
    message?: string;
    data?: ITimeTracker;
    errors?: IValidationError[];
}
