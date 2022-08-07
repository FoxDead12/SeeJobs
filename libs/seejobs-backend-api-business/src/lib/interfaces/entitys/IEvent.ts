export interface IEvent {

    id: number
    titulo: string;
    descricao: string;
    data: Date;
    horas?: Date;
    userUniqueId: string;
}