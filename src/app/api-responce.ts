import { ApiError } from "./api-error";

export class ApiResponse<T> {
    /**
     * Content of the response
     */
    content: T | null = null;
  
    /**
     * Error while answering the query
     */
    error: ApiError | null = null;
  }