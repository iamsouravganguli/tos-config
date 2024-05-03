"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_exports = {};
__export(query_exports, {
  Query: () => Query
});
module.exports = __toCommonJS(query_exports);
var import_mongoose = __toESM(require("mongoose"), 1);
class Query {
  global;
  // Global query properties.
  mongoose;
  // Mongoose instance
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
  constructor(props) {
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
  async run(props) {
    if (!props.modelKey) {
      throw new Error("Model key is required to run the query.");
    }
    try {
      const result = await props.queryFn(props.modelKey);
      if (result !== null && result !== void 0) {
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
  catchError(props) {
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
  async connect(dbUri, dbName) {
    this.mongoose = import_mongoose.default;
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
  async disconnect() {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Query
});
//# sourceMappingURL=index.js.map
