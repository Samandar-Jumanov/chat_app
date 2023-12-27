import { randomUUID } from "crypto";
import * as dotenv from 'dotenv';

dotenv.config();

const max: number = parseInt(process.env.MAX_CAPACITY || "2", 10);

interface RoomState {
    id: string;
    users: number;
}

export class Room {
    public roomsState: RoomState[] = [];

    constructor() {
        this.roomsState = [ { id : "", users : 0}];
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

    leave(Id : string){
         this.roomsState = this.roomsState.filter((room) =>{
              if(room.id === Id  && this.roomsState.users <=1 ){
                        return false;
              } else {
                this.roomsState.users--
              }
         })
    }
}
