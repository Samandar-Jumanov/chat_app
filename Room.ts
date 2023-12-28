import { randomUUID } from "crypto";
import * as dotenv from 'dotenv';

dotenv.config();

const max: number = parseInt(process.env.MAX_CAPACITY || "2", 10);

interface RoomState {
    id: string;
    users: number;
};

export class Room {
    public roomsState: RoomState[] = [];

    constructor() {
        this.roomsState = [];
    }

    join(): Promise<string> {
        return new Promise((resolve) => {
            for (let i = 0; i < this.roomsState.length; i++) {
                if (this.roomsState[i].users < max) {
                    this.roomsState[i].users++;
                    return resolve(this.roomsState[i].id);
                }
            }

            const uniqueId = randomUUID();
            this.roomsState.push({
                id: uniqueId,
                users: 1,
            });

            return resolve(uniqueId);
        });
    }

    leave(Id: string) {
        this.roomsState = this.roomsState.map((room) => {
            if (room.id === Id && room.users > 1) {
                room.users--;
            }
            return room;
        }).filter((room) => room.users > 0);
    }
}
