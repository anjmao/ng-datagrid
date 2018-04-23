export interface LentaColumn {
    prop: string;
    name?: string;
}

export interface LentaOptions {
    clientSide?: boolean;
    paging?: {
        disabled?: boolean,
        maxSize?: number,
        pageSize?: number
    }
}
