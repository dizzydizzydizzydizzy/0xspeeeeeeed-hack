import { makeUrl } from "@/util/api.util";
import { Frame, FrameButton } from "frames.js";

export const makeFrame = (
  data: string[][],
  params: {
    page: number;
    keyword?: string;
    hasPrevButton: boolean;
    hasNextButton: boolean;
    pagesize?: number;
    dataurl: string;
  }
) => {
  const buttons: FrameButton[] = [];

  const pagesize = Number(params.pagesize) || 10;

  const datastring = JSON.stringify(data);

  const rowLengthWoHeader = Math.max(0, data.length - 1);
  const totalPage = Math.ceil(rowLengthWoHeader / pagesize);
  const startRow = (params.page - 1) * pagesize;

  const visibleData = data
    .slice(0, 1)
    .concat(data.slice(1).slice(startRow, startRow + pagesize));

  const makeFrameUrl = (page: number) => {
    return makeUrl(
      `/frame/table/${encodeURIComponent(
        params.dataurl
      )}/${page}?pagesize=${pagesize}`
    );
  };

  if (!params.keyword) {
    buttons.push({
      label: params.hasPrevButton ? "Prev" : "-",
      action: "post",
      target: params.hasPrevButton
        ? makeFrameUrl(params.page - 1)
        : makeFrameUrl(totalPage || params.page),
    });
  }

  if (params.keyword) {
    buttons.push({
      label: "Home",
      action: "post",
      target: makeFrameUrl(1),
    });
  }
  // buttons.push({
  //   label: "🔍 Search",
  //   action: "post",
  //   target: makeFrameUrl(1),
  // });
  if (!params.keyword) {
    buttons.push({
      label: params.hasNextButton ? "Next" : "-",
      action: "post",
      target: params.hasNextButton
        ? makeFrameUrl(Number(params.page) + 1)
        : makeFrameUrl(1),
    });
  }

  return {
    image: makeUrl(
      `/gen/table/${encodeURIComponent(JSON.stringify(visibleData))}?page=${
        params.page
      }&totalpage=${totalPage}&${
        params.keyword ? `keyword=${params.keyword}` : ""
      }`
    ),
    version: "vNext",
    imageAspectRatio: "1.91:1",
    buttons,
    // inputText: "Search keyword",
    state: datastring,
  } as Frame;
};
