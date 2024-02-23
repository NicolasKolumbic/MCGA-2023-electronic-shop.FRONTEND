import { Category } from "@/models/category";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type Response = { data: Category; } | { error: FetchBaseQueryError | SerializedError; }
