export interface IViewFieldsOption {
    webUrl: string;
    isAppContextSite: boolean;
    list: string;
    view: string;
}

export interface IViewFieldsOnSuccess {
    (viewFields: Array<SP.Field>): void;
}

export interface IViewFieldsOnError {
    (message: string): void;
}

export declare function getViewFields(options: IViewFieldsOption, success: IViewFieldsOnSuccess, error: IViewFieldsOnError): void;