import {SchmSchemaObj} from '../Schema';

export class Context{
    private _schema:SchmSchemaObj;
    private _schemaList:SchmSchemaObj[];
    constructor(){}
    public set schema(schm:SchmSchemaObj){
        this._schema = schm;
    }
    public get schema():SchmSchemaObj{
        return this._schema;
    }
    public set schemaList(schms:SchmSchemaObj[]){
        this._schemaList = schms;
    }
    public get schemaList():SchmSchemaObj[]{
        return this._schemaList;
    }
}