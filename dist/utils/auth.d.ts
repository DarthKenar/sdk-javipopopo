export declare const getAuthRequestMetaData: (options?: RequestInit, providedToken?: string) => Promise<{
    headers: {
        Authorization: string;
    } | {
        Authorization: string;
        length: number;
        toString(): string;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
        pop(): [string, string] | undefined;
        push(...items: [string, string][]): number;
        concat(...items: ConcatArray<[string, string]>[]): [string, string][];
        concat(...items: ([string, string] | ConcatArray<[string, string]>)[]): [string, string][];
        join(separator?: string): string;
        reverse(): [string, string][];
        shift(): [string, string] | undefined;
        slice(start?: number, end?: number): [string, string][];
        sort(compareFn?: ((a: [string, string], b: [string, string]) => number) | undefined): [string, string][];
        splice(start: number, deleteCount?: number): [string, string][];
        splice(start: number, deleteCount: number, ...items: [string, string][]): [string, string][];
        unshift(...items: [string, string][]): number;
        indexOf(searchElement: [string, string], fromIndex?: number): number;
        lastIndexOf(searchElement: [string, string], fromIndex?: number): number;
        every<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: [string, string], index: number, array: [string, string][]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: [string, string], index: number, array: [string, string][]) => U, thisArg?: any): U[];
        filter<S extends [string, string]>(predicate: (value: [string, string], index: number, array: [string, string][]) => value is S, thisArg?: any): S[];
        filter(predicate: (value: [string, string], index: number, array: [string, string][]) => unknown, thisArg?: any): [string, string][];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduce(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduce<U>(callbackfn: (previousValue: U, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string]): [string, string];
        reduceRight(callbackfn: (previousValue: [string, string], currentValue: [string, string], currentIndex: number, array: [string, string][]) => [string, string], initialValue: [string, string]): [string, string];
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: [string, string], currentIndex: number, array: [string, string][]) => U, initialValue: U): U;
        find<S extends [string, string]>(predicate: (value: [string, string], index: number, obj: [string, string][]) => value is S, thisArg?: any): S | undefined;
        find(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): [string, string] | undefined;
        findIndex(predicate: (value: [string, string], index: number, obj: [string, string][]) => unknown, thisArg?: any): number;
        fill(value: [string, string], start?: number, end?: number): [string, string][];
        copyWithin(target: number, start: number, end?: number): [string, string][];
        entries(): ArrayIterator<[number, [string, string]]>;
        keys(): ArrayIterator<number>;
        values(): ArrayIterator<[string, string]>;
        includes(searchElement: [string, string], fromIndex?: number): boolean;
        flatMap<U, This = undefined>(callback: (this: This, value: [string, string], index: number, array: [string, string][]) => U | readonly U[], thisArg?: This | undefined): U[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        [Symbol.iterator](): ArrayIterator<[string, string]>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean | undefined;
            toString?: boolean | undefined;
            toLocaleString?: boolean | undefined;
            pop?: boolean | undefined;
            push?: boolean | undefined;
            concat?: boolean | undefined;
            join?: boolean | undefined;
            reverse?: boolean | undefined;
            shift?: boolean | undefined;
            slice?: boolean | undefined;
            sort?: boolean | undefined;
            splice?: boolean | undefined;
            unshift?: boolean | undefined;
            indexOf?: boolean | undefined;
            lastIndexOf?: boolean | undefined;
            every?: boolean | undefined;
            some?: boolean | undefined;
            forEach?: boolean | undefined;
            map?: boolean | undefined;
            filter?: boolean | undefined;
            reduce?: boolean | undefined;
            reduceRight?: boolean | undefined;
            find?: boolean | undefined;
            findIndex?: boolean | undefined;
            fill?: boolean | undefined;
            copyWithin?: boolean | undefined;
            entries?: boolean | undefined;
            keys?: boolean | undefined;
            values?: boolean | undefined;
            includes?: boolean | undefined;
            flatMap?: boolean | undefined;
            flat?: boolean | undefined;
            [Symbol.iterator]?: boolean | undefined;
            readonly [Symbol.unscopables]?: boolean | undefined;
            at?: boolean | undefined;
        };
        at(index: number): [string, string] | undefined;
    } | {
        Authorization: string;
    } | {
        Authorization: string;
        append(name: string, value: string): void;
        delete(name: string): void;
        get(name: string): string | null;
        getSetCookie(): string[];
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
        entries(): HeadersIterator<[string, string]>;
        keys(): HeadersIterator<string>;
        values(): HeadersIterator<string>;
        [Symbol.iterator](): HeadersIterator<[string, string]>;
    };
    body?: BodyInit | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode;
    priority?: RequestPriority;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
}>;
