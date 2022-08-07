import { BaseUserQuery } from "../base/BaseUserQuery";

export class UserValidationQuery extends BaseUserQuery {

    uniqueId: string;

    public constructor(init?: Partial<UserValidationQuery>) {

        super();
        Object.assign(this, init);
    }
}