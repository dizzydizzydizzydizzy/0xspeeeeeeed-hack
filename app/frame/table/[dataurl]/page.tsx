import { getFrameFlattened } from "frames.js";
import type { Metadata, ResolvingMetadata } from "next";
import { makeFrame } from "./page.util";
import { fetchRawDataBy } from "@/util/api.util";

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ dataurl: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dataurl = decodeURIComponent((await params).dataurl || "");

  const page = 1;
  const keyword = undefined;
  const pagesize = Number((await searchParams)?.["pagesize"]) || 10;

  const data: string[][] = await fetchRawDataBy(dataurl);

  const rowLengthWoHeader = Math.max(0, data.length - 1);
  const totalPage = Math.ceil(rowLengthWoHeader / pagesize);

  const pagination: {
    totalPage: number;
    currentPage: number;
  } = {
    totalPage,
    currentPage: page,
  };

  const hasPrevButton = Number(page) > 1;
  const hasNextButton = !!(Number(page) < pagination.totalPage);

  const frame = makeFrame(data, {
    dataurl,
    page,
    keyword,
    hasPrevButton,
    hasNextButton,
    pagesize,
  });
  const frameMeta = getFrameFlattened(frame);

  return {
    other: frameMeta as any,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ datastring: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen font-mono text-zinc-200 break-all">
      <div>
        <b>0xspeeeeeeed-frame</b>
      </div>
      <div>Base Mini-hackathon Seoul</div>
    </div>
  );
}
