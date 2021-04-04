import { injectable } from 'inversify';
import { ActionTypePayload, FilterNamePayload, FilterValuePayload, SortPayload } from 'typings/payloads';
import { FILTER_NAME_CHANGED, FILTER_VALUE_CHANGED, SET_HEADERS, SORT_DIRECTION_CHANGED } from '../../Store/actionNames';
import { VirtualizedTableReduxProps } from './VirtualizedTable';
import { VirtualizedTablePropsInitial } from './VirtualizedTableProps';

@injectable()
export class VirtualizedTableReducer {
    public reduce(state: VirtualizedTableReduxProps = VirtualizedTablePropsInitial, action: any): any {        
        switch (action.type) {
            // case GET_PROJECTS:
            //     return this.listLoaded(state, action.payload)
            case SET_HEADERS:
                return this.setHeader(state, action.payload)
            case SORT_DIRECTION_CHANGED:
                return this.sortDirectionChanged(state, action.payload)
            case FILTER_NAME_CHANGED:
                return this.filterNameChanged(state, action.payload)
            case FILTER_VALUE_CHANGED:
                return this.filterValueChanged(state, action.payload)
            default:
                return state;
        }
    }

    public getReducer = (): (state: VirtualizedTableReduxProps, action: ActionTypePayload<any, any>) => VirtualizedTableReduxProps => {
        return (state: VirtualizedTableReduxProps, action: ActionTypePayload<any, any>): VirtualizedTableReduxProps =>
            this.reduce(state, action);
    }



    protected setHeader(state: VirtualizedTableReduxProps, payload: any): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.headers = payload.headers;

        return newState;
    }


    protected filterValueChanged(state: VirtualizedTableReduxProps, payload: FilterValuePayload): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.filterValue = payload.filterValue
        newState.data = [...newState.data.filter(el => el[newState.filterName] == newState.filterValue)]
        console.log(newState.data);
        
        
        return newState;
    }

    protected filterNameChanged(state: VirtualizedTableReduxProps, payload: FilterNamePayload<any>): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.filterName = payload.filterName  
        newState.filterValue = ""        

        return newState;
    }

    protected sortDirectionChanged(state: VirtualizedTableReduxProps, payload: SortPayload<any>): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.sortBy = payload.sortField
        newState.sortDir = payload.sortDirection

        return newState;
    }

}
