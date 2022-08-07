import { BaseEventQuery } from "../base/BaseEventQuery";

export class GetAllEventsQuery extends BaseEventQuery {

    constructor(uniqueId: string) {
        super();
        this.uniqueId = uniqueId;
    }
}