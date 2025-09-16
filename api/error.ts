import { ApiResponse } from "./types";

export class APIError extends Error {
    public response:ApiResponse<any>;
    constructor(message:string, response:ApiResponse<any>) {
        super(message);
        this.name = "APIError";
        this.response = response;
        Object.setPrototypeOf(this, APIError.prototype);
    }
}