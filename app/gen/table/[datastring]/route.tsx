/**
 * NOTE: for preview
 */

import { getImageBuffer } from "@/util/satori.util";
import { ImageResponse } from "@vercel/og";
import { GenTableComponent } from "../GenTable";
import { GenBase } from "../../base/GenBase";

export const runtime = "edge";

const handleRequest = async (
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      datastring: string;
    }>;
    searchParams: any;
  }
) => {
  const datastring = (await params).datastring;

  const { searchParams } = new URL(request.url);
  const pageString = searchParams.get("page") || "1";
  const totalpageString = searchParams.get("totalpage") || "1";
  const keyword = searchParams.get("keyword") || undefined;

  const page = Number(pageString); // starts from 1
  const totalpage = Number(totalpageString);

  const data: string[][] = JSON.parse(decodeURIComponent(datastring));

  return await genTableImageResponse(
    data,
    {
      currentPage: page,
      totalPage: totalpage,
    },
    keyword
  );
};

export const GET = handleRequest;
export const POST = handleRequest;

const genTableImageResponse = async (
  data: string[][],
  pagination?: {
    totalPage: number;
    currentPage: number;
  },
  keyword?: string
) => {
  if (
    !(
      Array.isArray(data) &&
      data.every((row) => Array.isArray(row)) &&
      data.length > 0
    )
  ) {
    data = [[JSON.stringify(data)]];
  }

  const logoImage = await getImageBuffer("https://i.imgur.com/8nLFCVP.png");

  const res = new ImageResponse(
    (
      <GenTableComponent
        images={{
          logoImage,
        }}
        table={data}
        pagination={pagination}
        keyword={keyword}
      />
    ),
    GenBase.imageResponseOptions()
  );

  return res;
};
