import { BaseUserQuery } from "../base/BaseUserQuery";

export class UserLoginQuery extends BaseUserQuery {

    email: string;
    password: string;
    keepSession: boolean;

    public constructor(init?: Partial<UserLoginQuery>) {

        super();
        Object.assign(this, init);
    }
}