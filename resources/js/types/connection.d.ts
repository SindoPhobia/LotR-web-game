import Echo from 'laravel-echo';

declare global {
    interface Window {
       Echo: Echo,
    }
}

export enum ConnectionState {
    Connected = 'connected',
    Connecting = 'connecting',
    Unavailable = 'unavailable',
    Disconnected = 'disconnected',
};

// TODO: Update once we define the structure of every communication channel & event
export type ChannelsMap = {
    'sessions': ChannelSessionsEventsMap,
};

export type ChannelSessionsEventsMap = {
    [key: `session.${number}`]: null,
    'session': null, // WARN: Not for use, helps display the above typing while... typing.
};
