import { Movement } from "models";

export type Log = {
    id: number,
    type: string,
    movementId: number,
    movement: Movement
    createdAt: string,
    updatedAt: string
}