import { getFrameFlattened } from "frames.js";
import type { Metadata, ResolvingMetadata } from "next";
import { makeFrame } from "./page.util";

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ datastring: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const datastring = ((await params).datastring || "").trim().toLowerCase();

  const frame = makeFrame(datastring, {
    scale: 10,
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
  const datastring = ((await params).datastring || "").trim().toLowerCase();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen font-mono text-zinc-200 break-all">
      <div>
        <b>0xspeeeeeeed-frame</b>
      </div>
      <div>Base Mini-hackathon Seoul</div>
    </div>
  );
}
