class AccionEvent{
    readonly actionId:string
    constructor(actionId:string){
        this.actionId=actionId;
    }
    /*getActionId():string{
        return this.#actionId;
    }*/
}

export class AccionSolicitadaEvent extends AccionEvent{
    constructor(actionId:string){
        super(actionId);
    }
}

export class AccionConfirmadaEvent extends AccionEvent{
    constructor(actionId:string){
        super(actionId);
    }
}

export class AccionCanceladaEvent extends AccionEvent{
    constructor(actionId:string){
        super(actionId);
    }
}
