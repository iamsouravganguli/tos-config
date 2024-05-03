import mongoose from "mongoose";

export interface QueryProps<T> {
    onError?: (error) => void;
    onSuccess?: (result: T) => void;
    onNotFound?: () => void;
}

export interface RunProps<T> {
    modelKey: mongoose.Model<any>;
    queryFn: (model: mongoose.Model<any>) => Promise<T>;
    onError?: (error) => void;
    onSuccess?: (result: T) => void;
    onNotFound?: () => void;
}

export interface CatchErrorProps {
    onError?: (error: ((error) => void) | undefined) => void;
}

export declare class Query<T> {
    private global?: QueryProps<T>;
    private mongoose?: typeof mongoose;

    constructor(props?: QueryProps<T>);

    public run(props: RunProps<T>): Promise<void>;

    public catchError(props: CatchErrorProps): void;

    public connect(dbUri?: string, dbName?: string): Promise<void>;

    public disconnect(): Promise<void>;
}
export type ResponseProps = string | null | undefined;

// Define the ResponseServices class
export declare class ResponseServices {
    private readonly props: ResponseProps;

    constructor(text?: ResponseProps | null);

    handler: (
        services: (req: Request, res: Response) => Promise<any>
    ) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

    error: (response: Response, error: Error) => Response;

    success: (
        response: Response,
        type: "create" | "update" | "delete" | "all" | "detail" | "other",
        data?: any,
        message?: string
    ) => Response;
}