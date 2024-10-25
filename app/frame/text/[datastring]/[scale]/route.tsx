import { makeUrl, validateLum0xFrame } from "@/util/api.util";
import { getFrameHtml } from "frames.js";
import { NextResponse } from "next/server";
import { makeFrame } from "../page.util";

const handleRequest = async (
  request: Request,
  {
    params: { datastring, scale },
  }: {
    params: {
      datastring: string;
      scale: string;
    };
  }
) => {
  validateLum0xFrame(makeUrl(`/frame/text/${datastring}`));

  return new NextResponse(
    getFrameHtml(
      makeFrame(datastring, {
        scale: Number(scale || "1"),
      }),
      {}
    )
  );
};

export const GET = handleRequest;
export const POST = handleRequest;
