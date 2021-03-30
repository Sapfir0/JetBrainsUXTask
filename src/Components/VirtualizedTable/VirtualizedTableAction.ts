
import { injectable } from 'inversify';
import { SELECT_TABLE_ROW } from '../../Store/actionNames';


@injectable()
export class VirtualizedTableAction {

    private SelectRow(value: number): any {
        return { type: SELECT_TABLE_ROW, Payload: value };
    }


    
}