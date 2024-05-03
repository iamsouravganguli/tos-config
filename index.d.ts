import { Model, Document } from "mongoose";
import {NextFunction} from "express";

/**
 * Defines a callback function that handles a successful query result.
 * @template T The type of the query result.
 */
export type SuccessCallback<T> = (result: T) => void;

/**
 * Defines a callback function that handles an error during query execution.
 */
export type ErrorCallback = (error: any) => void;

/**
 * Defines a callback function that handles a "not found" scenario in a query result.
 */
export type NotFoundCallback = () => void;

/**
 * Defines a function that represents a query operation.
 * @template T The type of the query result.
 */
export type QueryFunction<T> = (
    model: Model<Document<any, any, any>, {}> | undefined
) => Promise<T>;

/**
 * Represents the properties that can be passed to a Query instance.
 * @template T The type of the query result.
 */
export type QueryProps<T> = {
    /**
     * Callback function to be called on successful query execution.
     */
    onSuccess?: SuccessCallback<T>;
    /**
     * Callback function to be called when an error occurs during query execution.
     */
    onError?: ErrorCallback;
    /**
     * Callback function to be called when the query result is not found.
     */
    onNotFound?: NotFoundCallback;
};

/**
 * Represents the properties required to run a query.
 * @template T The type of the query result.
 */
export type RunProps<T> = {
    /**
     * The Mongoose model used to execute the query.
     */
    modelKey: Model<any>;
    /**
     * The function that defines the query logic.
     */
    queryFn: QueryFunction<T>;
    /**
     * Optional callback function to be called on successful query execution.
     */
    onSuccess?: SuccessCallback<T>;
    /**
     * Optional callback function to be called when an error occurs during query execution.
     */
    onError?: ErrorCallback;
    /**
     * Optional callback function to be called when the query result is not found.
     */
    onNotFound?: NotFoundCallback;
};

/**
 * Represents the properties that can be passed to the catchError method.
 */
export type CatchErrorProps = {
    /**
     * Callback function to be called when an error occurs during query execution.
     */
    onError?: ErrorCallback;
};

/**
 * Represents the properties required to connect to the MongoDB database.
 */
export type ConnectProps = {
    /**
     * The MongoDB connection URI.
     */
    dbUri: string;
    /**
     * The name of the database.
     */
    dbName: string;
};

/**
 * Represents the properties required to disconnect from the MongoDB database.
 */
export type DisconnectProps = {};

export type ResponseProps = string | null | undefined;