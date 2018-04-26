import { isDefined } from '../util/value-util';

export interface LentaColumnCtor {
    prop: string;
    name?: string;
    sortable?:
    boolean;
    size?: any;
}

export class LentaColumn {
    prop: string;
    name: string;
    sortable: boolean;
    size: any;

    constructor(opts: LentaColumnCtor) {
        if (!opts.prop) {
            throw new Error('LentaColumn prop is required.');
        }
        this.prop = opts.prop;
        this.name = isDefined(opts.name) ? <string>opts.name : this.prop;
        this.sortable = opts.sortable || true;
        this.size = opts.size || null;
    }
}

export class LentaColumns {
    static create(cols: LentaColumnCtor[]) {
        const result: LentaColumn[] = [];
        for (const col of cols) {
            result.push(new LentaColumn(col))
        }
        return result;
    }
}
