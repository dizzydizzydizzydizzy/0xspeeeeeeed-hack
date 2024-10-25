import { makeUrl } from "@/util/api.util";
import { Frame } from "frames.js";

export const makeFrame = (
  datastring: string,
  params: {
    scale: number;
  }
) => {
  const ZOOM_SCALE = 1.3;
  const MAX_ZOOM = 20;
  const MIN_ZOOM = 0.5;

  return {
    image: makeUrl(`/gen/text/${datastring}?scale=${params.scale}`),
    version: "vNext",
    imageAspectRatio: "1.91:1",
    buttons: [
      {
        label: "Zoom In",
        action: "post",
        target: makeUrl(
          `/frame/text/${datastring}/${Math.min(
            Math.floor(params.scale * ZOOM_SCALE * 10) / 10,
            MAX_ZOOM
          )}`
        ),
      },
      {
        label: "Zoom Out",
        action: "post",
        target: makeUrl(
          `/frame/text/${datastring}/${Math.max(
            Math.floor((params.scale / ZOOM_SCALE) * 10) / 10,
            MIN_ZOOM
          )}`
        ),
      },
    ],
  } as Frame;
};
