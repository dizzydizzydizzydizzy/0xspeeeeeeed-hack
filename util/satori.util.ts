const _getBlackDotBuffer = async () => {
  const blackDotPngBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/ehNTgAAAABJRU5ErkJggg==";
  return `data:image/png;base64, ${blackDotPngBase64}`;
};

export const getImageBuffer = async (imgSrc: string): Promise<string> => {
  try {
    const res = await fetch(new URL(imgSrc, import.meta.url));
    const buffer = await res?.arrayBuffer();
    return buffer as any;
  } catch {
    return _getBlackDotBuffer();
  }
};

export const getFontBuffer = async (fontSrc: string) => {
  return await fetch(fontSrc).then((res) => res.arrayBuffer());
};
