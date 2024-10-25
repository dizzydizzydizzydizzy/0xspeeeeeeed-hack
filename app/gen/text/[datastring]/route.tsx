/**
 * NOTE: for preview
 */

import { getImageBuffer } from "@/util/satori.util";
import { ImageResponse } from "@vercel/og";
import { GenTextComponent } from "../GenText";
import { GenBase } from "../../base/GenBase";

export const runtime = "edge";

const handleRequest = async (
  request: Request,
  {
    params: { datastring },
  }: {
    params: {
      datastring: string;
    };
  }
) => {
  const { searchParams } = new URL(request.url);
  const scaleString = searchParams.get("scale") || "1";

  const data = decodeURIComponent(datastring);

  return await genTextImageResponse(data, Number(scaleString));
};

export const GET = handleRequest;
export const POST = handleRequest;

// handle server-side view
const genTextImageResponse = async (data: string, scale: number) => {
  try {
    data = data.toString();
  } catch {
    data = JSON.stringify(data);
  }

  const logoImage = await getImageBuffer("https://i.imgur.com/8nLFCVP.png");

  const res = new ImageResponse(
    (
      <GenTextComponent
        images={{
          logoImage,
        }}
        text={data}
        scale={scale}
      />
    ),
    GenBase.imageResponseOptions()
  );

  return res;
};
