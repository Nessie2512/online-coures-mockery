import { InvariantViolationError } from "../errors/domainError";

export  class Entity <props>{
    private _id: string;
    private _internalId?: number;
    private _createdAt: Date;
    private _editedAt?: Date;
    private status:boolean
    props: props;

    constructor(props: props, id?: string) {
        this._id = id ?? crypto.randomUUID();
        this.status = true
        this.props = props;
        this._createdAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    /**
     * Internal numeric primary key used by Prisma relations.
     * UUIDs remain the public identifier; this is only exposed in responses
     * so clients can send numeric relation IDs back to the API.
     */
    get internalId(): number | undefined {
        return this._internalId;
    }

    public setInternalId(internalId: number): void {
        this._internalId = internalId;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get editedAt(): Date | undefined {
        return this._editedAt;
    }

     get isAtive(): boolean {
        return this.status;
    }

    public activate(){

        if(this.status){
            throw new InvariantViolationError("It is already activa")
        }
        this.status = true
    }

    public deActivate(){
        if(!this.status){
            throw new InvariantViolationError("It is already deactivated")
        }
        this.status = false
    }

    public changeStatus():void{
        this.status = !this.status;
    }

}