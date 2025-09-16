import { APIError } from "./api/error";

declare module '@tanstack/react-query' {
  interface Register{
    defaultError : APIError
  }
}