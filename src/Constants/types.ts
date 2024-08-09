export interface Root {
    date: string;
    log: Log;
    created_at: Date
}

export interface Log {
    type: string;
    subType: string;
    buildingType: string;
    projectName: string;
    message: string;
    handShakeRequestedBy: HandShakeRequestedBy;
    handShakeRequestedTo: HandShakeRequestedTo[];
    created_at?: Date;
    created_by?: HandShakeRequestedBy;
    allotedUsers: AllotedUser[];
    updatedBy: UpdatedBy;
    meetingLogs: MeetingLogs;
    meetingMembers: MeetingMember[];
}
export interface AllotedUser {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    position: string;
    department: string;
    password: string;
    created_at: string;
    updated_at: any;
    picture: string;
    role: string;
    latitude: number;
    longitude: number;
}

export interface UpdatedBy {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    position: string;
    department: string;
    password: string;
    created_at: string;
    updated_at: any;
    picture: string;
    role: string;
    latitude: number;
    longitude: number;
}

export interface HandShakeRequestedBy {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    position: string;
    department: string;
    password: string;
    created_at: string;
    updated_at: any;
    picture: string;
    role: string;
    latitude: number;
    longitude: number;
}

export interface HandShakeRequestedTo {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    position: string;
    department: string;
    password: string;
    created_at: string;
    updated_at: any;
    picture: string;
    role: string;
    latitude: number;
    longitude: number;
}

export interface MeetingLogs {
    id: number;
    meetingId: number;
    startTime: string;
    endTime: any;
    inProgress: number;
    meetingNotes: any;
    members: string;
    startedBy: any;
    meetingLocation: string;
    meetingTopic: string;
}

export interface MeetingMember {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    position: string;
    department: string;
    password: string;
    created_at: string;
    updated_at: any;
    picture: string;
    role: string;
    latitude: number;
    longitude: number;
}