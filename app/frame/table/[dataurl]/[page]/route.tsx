import { fetchRawDataBy, makeUrl, validateLum0xFrame } from "@/util/api.util";
import { getFrameHtml, getFrameMessageFromRequestBody } from "frames.js";
import { NextResponse } from "next/server";
import { makeFrame } from "../page.util";

const handleRequest = async (
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      dataurl: string;
      page: string;
    }>;
  }
) => {
  const { searchParams } = new URL(request.url);
  const _params = await params;
  const dataurl = decodeURIComponent(_params.dataurl);
  const page = _params.page;
  const pagesize = Number(searchParams.get("pagesize") || "10");
  let datastring = "";

  validateLum0xFrame(makeUrl(`/frame/table/${datastring}`));

  let keyword = "";

  if (request.method === "POST") {
    try {
      const bodyJson = await request.json();
      const frBody = getFrameMessageFromRequestBody(bodyJson);

      keyword = frBody.data?.frameActionBody?.inputText.toString() || "";
      datastring = frBody.data?.frameActionBody?.state?.toString() || "";
    } catch {}
  }

  let data: string[][] = [];
  if (datastring) {
    try {
      data = JSON.parse(datastring);
    } catch {}
  } else {
    data = await fetchRawDataBy(dataurl);
  }

  const rowLengthWoHeader = Math.max(0, data.length - 1);
  const totalPage = Math.ceil(rowLengthWoHeader / Number(pagesize));

  const pagination: {
    totalPage: number;
    currentPage: number;
  } = {
    totalPage,
    currentPage: Number(page),
  };

  const hasPrevButton = Number(page) > 1;
  const hasNextButton = !!(Number(page) < pagination.totalPage);

  return new NextResponse(
    getFrameHtml(
      makeFrame(data, {
        dataurl,
        page: Number(page),
        keyword: keyword || undefined,
        hasPrevButton,
        hasNextButton,
        pagesize: Number(pagesize),
      }),
      {}
    )
  );
};

export const GET = handleRequest;
export const POST = handleRequest;
