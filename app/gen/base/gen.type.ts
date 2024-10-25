import { ImageResponse } from "next/og";

export type GenGetFunctionType = (request: Request) => Promise<ImageResponse>;
