import { injectable } from 'inversify';
import { SELECT_TABLE_ROW } from '../../Store/actionNames';
import { VirtualizedTableProps, VirtualizedTablePropsInitial } from './VirtualizedTableProps';

@injectable()
export class VirtualizedTableReducer {
    public Reduce(state: VirtualizedTableProps = VirtualizedTablePropsInitial, action: IActionPayloaded<any>): IState {
        switch (action.type) {
            case SELECT_TABLE_ROW:
                return this.SelectTableRow(state, action.Payload);
            default:
                return state;
        }
    }

    private SelectTableRow(state: VirtualizedTableProps, payload: number): VirtualizedTableProps {
        const newState = { ...state };

        newState.selectedRow = payload;
        console.log(payload);

        return newState;
    }
}
