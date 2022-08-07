import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DtoEvent } from "./DtoEvent";

@Entity("Users")
export class DtoUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    email: string;

    @Column({type: "varchar"})
    hash: string;

    @Column({type: "varchar"})
    uniqueId: string;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "datetime", nullable: true})
    lastLogin: Date;

    @Column({type: "datetime"})
    dateCreated: Date;
}