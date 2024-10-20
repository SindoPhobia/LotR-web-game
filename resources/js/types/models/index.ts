import {User, Password_reset_token, Session} from './tables/User';
import {Cach, Cache_lock} from './tables/Cach';
import {Job, Job_batche, Failed_job} from './tables/Job';
import {Todo} from './tables/Todo';

export type Id = number;

export type ForeignId = number;

export type Timestamp = string;

export type Timestamps = string;