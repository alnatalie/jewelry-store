import { Allow, Entity, Fields } from "remult";

@Entity('item', {
    allowApiCrud:true,
    allowApiDelete: false
})
export class Item {
    @Fields.autoIncrement()
    id:number = 0;
    
    @Fields.string()
    title ='';

    @Fields.boolean()
    completed = false;

    @Fields.createdAt()
    createdAt?: Date;

    @Fields.boolean({includeInApi: false})
    del?: boolean;
    
    @Fields.boolean({includeInApi: false})
    temp?: boolean;
}


