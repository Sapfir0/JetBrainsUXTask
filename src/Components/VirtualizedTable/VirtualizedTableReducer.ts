import { injectable } from 'inversify';
import { range } from 'shared/utils';
import { ActionTypePayload, FilterNamePayload, FilterValuePayload, SortPayload } from 'typings/payloads';
import { FILTER_NAME_CHANGED, FILTER_VALUE_CHANGED, GET_LIST, SET_HEADERS, SORT_DIRECTION_CHANGED } from '../../Store/actionNames';
import { Subject, VirtualizedTableReduxProps } from './VirtualizedTable';
import { VirtualizedTablePropsInitial } from './VirtualizedTableProps';

@injectable()
export class VirtualizedTableReducer {
    public reduce(state: VirtualizedTableReduxProps = VirtualizedTablePropsInitial, action: any): any {        
        switch (action.type) {
            case GET_LIST:
                return this.getList(state, action.payload)
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

    protected getList(state: VirtualizedTableReduxProps, payload: any): VirtualizedTableReduxProps {
        const newState = {...state};

        const list = range(50000).map((el, i) => ({
            id: i,
            data1: `data1 ${i}`,
            data2: `data2 ${i}`,
            data3: `data3 ${i}`,
            data4: `data4 ${i}`,
        }));

        newState.data = list
        newState.originalData = list

        return newState;
    }


    protected setHeader(state: VirtualizedTableReduxProps, payload: any): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.headers = payload.headers;

        return newState;
    }


    protected filterValueChanged(state: VirtualizedTableReduxProps, payload: FilterValuePayload): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.filterValue = payload.filterValue

        const {filterName, filterValue} = newState

        if (filterName === undefined || filterValue === undefined) {
            newState.data = newState.originalData;
            return newState
        }

        try {
            newState.data = newState.originalData.filter(el => el[filterName].match(new RegExp(filterValue)));
        } catch (e) {
            console.log(e);
        }
          
        return newState;
    }

    protected filterNameChanged(state: VirtualizedTableReduxProps, payload: FilterNamePayload): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.filterName = payload.filterName  
        newState.filterValue = undefined        

        return newState;
    }

    protected sortDirectionChanged(state: VirtualizedTableReduxProps, payload: SortPayload): VirtualizedTableReduxProps {
        const newState = {...state};

        newState.sortBy = payload.sortField
        newState.sortDir = payload.sortDirection

        const sortableData = [...newState.data].sort(( a: Subject, b: Subject ) => { 
            const parsedA = Number.parseInt(a[newState.sortBy])
            const parsedB = Number.parseInt(b[newState.sortBy])

            if (isNaN(parsedA) && isNaN(parsedB)) {
                return a[newState.sortBy].localeCompare(b[newState.sortBy]) 
            } else {
                return parsedA - parsedB
            }
        })
 

        if (payload.sortDirection === 'desc') {
            newState.data = sortableData;
        } else {
            newState.data = sortableData.reverse()
        }

        return newState;
    }

}
