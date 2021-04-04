import { SortDirection } from "typings"

export type PagePayload = {  page: number }
export type PageSizePayload = {  pageSize: number }
export type SortPayload<T> = {  sortField: keyof T, sortDirection: SortDirection }
export type FilterNamePayload<T> = {  filterName: keyof T | undefined }
export type FilterValuePayload = {  filterValue: string | undefined }
export type StartDatePayload = {  startDate: Date | null }
export type EndDatePayload = {  endDate: Date | null }
export type SelectedUploadProjects = { id: string }
export type ConfigPayload<T> = { config: ListConfig<T> }
export type ImagesPayload = { imagesUrl: Array<string> }

export interface ActionTypePayload<PayloadType, ActionType> {
    type: ActionType;
    payload: PayloadType;
}

export interface ActionTypePure<ActionType> {
    type: ActionType;
}


export interface ListConfig<T> extends PageSizePayload,
    PagePayload, SortPayload<T>, FilterValuePayload, FilterNamePayload<T> {}