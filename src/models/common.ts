export type Order = 'asc' | 'desc';

export interface Pagination {
    _limit: number;
    _page: number;
    _totalRows: number;
}

export interface ListResponse<T> {
    data: T[];
    pagination: Pagination;
}

export interface ListParams {
    _page: number;
    _limit: number;
    _sort?: string;
    _order?: Order;
    name_like?: string;

    [key: string]: any;
}

export type FetchStatus = 'fetch_request' | 'fetch_success' | 'fetch_error';
