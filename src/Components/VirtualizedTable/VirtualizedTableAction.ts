
import { injectable } from 'inversify';
import { Column, SortDirection } from 'typings';
import { ActionTypePayload, FilterNamePayload, FilterValuePayload, SortPayload } from 'typings/payloads';
import { FILTER_NAME_CHANGED, FILTER_VALUE_CHANGED, GET_LIST, SET_HEADERS, SORT_DIRECTION_CHANGED } from '../../Store/actionNames';


@injectable()
export class VirtualizedTableAction {
    public getList = (filterName: string | undefined, filterValue: string | undefined, sortField: string, sortDirection: SortDirection): ActionTypePayload<any, any> => ({
        type: GET_LIST,
        payload: {
            filterName, filterValue, sortField, sortDirection
        }
    })

    public setHeaders = (headers: Column[]): ActionTypePayload<any, any> => ({
        type: SET_HEADERS,
        payload: {
            headers
        }
    })

    public sortDirectionChanged = <T>(sortField: keyof T, sortDirection: SortDirection): ActionTypePayload<SortPayload<T>, any> => ({
        type: SORT_DIRECTION_CHANGED,
        payload: {
            sortField, sortDirection
        }
    })

    public filterNameChanged = <T>(filterName: keyof T | undefined): ActionTypePayload<FilterNamePayload<T>, any> => ({
        type: FILTER_NAME_CHANGED,
        payload: {
            filterName
        }
    })

    public filterValueChanged = (filterValue: string | undefined): ActionTypePayload<FilterValuePayload, any> => ({
        type: FILTER_VALUE_CHANGED,
        payload: {
            filterValue
        }
    })


    
}