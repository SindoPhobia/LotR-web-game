import {Id, ForeignId, Timestamp, Timestamps} from '../index';

export type User = {
    id: Id; 
    name: string; 
    email: string; //* [Unique value]
    email_verified_at?: Timestamp; 
    password: string; 
    rememberToken: string; 
}

export type Password_reset_token = {
    email: string; //* [Primary Key]
    token: string; 
    created_at?: Timestamp; 
}

export type Session = {
    id: string; //* [Primary Key]
    user_id?: ForeignId; //* [Index]
    ip_address?: string; 
    user_agent?: string; 
    payload: string; 
    last_activity: number; //* [Index]
}

