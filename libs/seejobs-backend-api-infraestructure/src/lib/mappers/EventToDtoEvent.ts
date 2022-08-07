import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { IEvent } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { DtoEvent } from "@see-jobs-2/seejobs-backend-api-models/dtos";

export class EventToDtoEvent extends AbstractMapper<IEvent, DtoEvent> {
    public Map(inObject: IEvent): DtoEvent {

        const dto = new DtoEvent();

        dto.id = inObject.id;
        dto.descricao = inObject.descricao;
        dto.titulo = inObject.titulo;
        dto.data = new Date(inObject.data);
        
        if(inObject.horas)
            dto.horas = new Date(inObject.horas);
        else
            dto.horas = null;
        dto.userUniqueId = inObject.userUniqueId;

        return dto;
    }


}