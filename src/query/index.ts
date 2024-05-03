import { QueryProps, RunProps, CatchErrorProps } from "./types";
import mongoose from "mongoose";

/**
 * Represents a query handler class that executes queries and handles errors.
 * @template T The type of the query result.
 */
export class Query<T> {
  private global?: QueryProps<T>; // Global query properties.
  private mongoose?: typeof mongoose; // Mongoose instance

  /**
   * Creates an instance of the Query class.
   * This constructor allows you to optionally provide global properties to be applied to all queries.
   * @param {QueryProps<T>} [props] Optional properties to be applied globally to all queries.
   * @example
   * // Create a new Query instance with global error handling.
   * const query = new Query<MyResultType>({
   *   onError: (error) => console.error('Global error handler:', error),
   * });
   */
  constructor(props?: QueryProps<T>) {
    this.global = props;
  }

  /**
   * Executes a query asynchronously.
   * This method runs the specified query function and handles success, error, and "not found" scenarios.
   * @param {RunProps<T>} props Properties required to run the query.
   * @returns {Promise<void>} A Promise that resolves when the query is executed.
   * @throws {Error} Throws an error if the model key is missing.
   * @example
   * // Define the run properties with a query function and error handling.
   * const runProps: RunProps<MyResultType> = {
   *   modelKey: MyModel,
   *   queryFn: async (model) => await model.find({}),
   *   onError: (error) => console.error('Query error:', error),
   * };
   * // Execute the query.
   * await query.run(runProps);
   */
  public async run(props: RunProps<T>): Promise<void> {
    if (!props.modelKey) {
      throw new Error("Model key is required to run the query.");
    }

    try {
      const result = await props.queryFn(props.modelKey);
      if (result !== null && result !== undefined) {
        props.onSuccess?.(result);
        this.global?.onSuccess?.(result);
      } else {
        props.onNotFound?.();
        this.global?.onNotFound?.();
      }
    } catch (error) {
      props.onError?.(error);
      this.global?.onError?.(error);
    }
  }

  /**
   * Handles errors during query execution.
   * This method allows you to handle errors globally or locally for a specific query.
   * @param {CatchErrorProps} props Properties for handling errors.
   * @example
   * // Define the error handling properties.
   * const catchErrorProps: CatchErrorProps = {
   *   onError: (error) => console.error('Query execution error:', error),
   * };
   * // Handle errors for a specific query.
   * query.catchError(catchErrorProps);
   */
  public catchError(props: CatchErrorProps): void {
    props.onError?.(this.global?.onError);
  }

  /**
   * Connects to the MongoDB database using Mongoose.
   * @param {string} [dbUri] The MongoDB connection URI. If not provided, it defaults to an empty string.
   * @param {string} [dbName] The name of the database.
   * @returns {Promise<void>} A Promise that resolves when the connection is successful.
   * @throws {Error} Throws an error if the connection fails.
   * @example
   * // Connect to MongoDB with URI and database name
   * await query.connect("mongodb://localhost:27017", "myDatabase");
   * // Connect to MongoDB with only database name (uses default URI)
   * await query.connect(undefined, "myDatabase");
   */
  public async connect(dbUri?: string, dbName?: string): Promise<void> {
    this.mongoose = mongoose;
    try {
      await this.mongoose.connect(dbUri || "", { dbName });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(`MongoDB connection error: ${error}`);
      throw error;
    }
  }

  /**
   * Disconnects from the MongoDB database.
   * @returns {Promise<void>} A Promise that resolves when the disconnection is successful.
   */
  public async disconnect(): Promise<void> {
    if (this.mongoose) {
      try {
        await this.mongoose.connection.close();
        console.log("Disconnected from MongoDB");
      } catch (error) {
        console.error(`Error closing MongoDB connection: ${error}`);
        throw error;
      }
    }
  }
}
