import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DtoUser } from "./DtoUser";

@Entity("Events")
export class DtoEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    titulo: string;

    @Column({type: "varchar"})
    descricao: string;

    @Column({type: "date"})
    data: Date;

    @Column({type: "time", nullable: true})
    horas?: Date;
    
    @Column({type: "varchar"})
    userUniqueId: string;

}