import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { DtoEvent } from "@see-jobs-2/seejobs-backend-api-models/dtos";
import { GettAllEventsView } from "@see-jobs-2/seejobs-backend-api-models/views";

export class DtoEventToGettAllEventsView extends AbstractMapper<DtoEvent, GettAllEventsView> {
    
    public Map(inObject: DtoEvent): GettAllEventsView {

        const view = new GettAllEventsView();

        Object.assign(view, inObject);
        return view;
    }


}