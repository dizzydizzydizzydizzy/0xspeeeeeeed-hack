export const runtime = "edge";

interface Props {
  images: {
    [keyof: string]: string;
  };
  table: string[][];
  pagination?: {
    totalPage: number;
    currentPage: number;
  };
  keyword?: string;
}

export const GenTableComponent = ({
  images,
  table,
  pagination,
  keyword,
}: Props) => {
  table = table.map((tr) => tr.map((td) => td.toString() || ""));

  const th = table[0];
  const trs = table.slice(1);
  const numOfTh = th.length || 0;

  const maxTdWidth = th.map(() => 0);
  for (const tr of table) {
    let index = 0;
    for (const td of tr) {
      if (index >= numOfTh) break;
      maxTdWidth[index] = Math.max(maxTdWidth[index], td.length);
      index++;
    }
  }
  const maxLengthSum = maxTdWidth.reduce((acc, val) => acc + val, 0);
  const widthRatio = maxTdWidth.map(
    (val) => Math.floor((val / maxLengthSum) * 100) + "%"
  );

  const baseRowStyle = (index: number): any => ({
    width: widthRatio[index],
    padding: "4px 6px",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderBottom: "1px solid #b2b2b2",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        position: "relative",
        padding: 24,
        backgroundColor: "#0052FF",
        color: "white",
        fontSize: "16px",
      }}
    >
      {/* watermark */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          left: 24,
          bottom: 12,
          opacity: 0.5,
          fontSize: "0.85rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "2.0rem",
            height: "2.0rem",
            display: "flex",
            marginRight: 10,
          }}
        >
          <img src={images.logoImage} alt="Logo" width="100%" height="100%" />
        </div>
        <div style={{ fontSize: "1.3rem" }}>
          0xspeeeeeeed-frame | Base Mini-hackathon Seoul
        </div>
      </div>
      {/* content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
          color: "white",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            position: "relative",
            color: "#FF8B00",
            borderBottom: "1px solid #FF8B00",
          }}
        >
          {th.map((item, thIndex) => (
            <div
              key={`th_${thIndex}`}
              style={{
                ...baseRowStyle(thIndex),
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* body */}
        {trs.map((tr, trIndex) => (
          <div
            key={`tr_${trIndex}`}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              position: "relative",

              color: "white",
            }}
          >
            {th.map((_, thIndex) => (
              <div
                key={`td_${trIndex}_${thIndex}`}
                style={{
                  ...baseRowStyle(thIndex),
                }}
              >
                {tr?.[thIndex] || ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* pagination */}
      {pagination && !keyword && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: 16,
            right: 30,
            fontSize: "0.8rem",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
            }}
          >
            {pagination?.currentPage}
          </span>
          <span
            style={{
              opacity: 0.8,
              marginLeft: "4px",
            }}
          >
            / {pagination?.totalPage}
          </span>
        </div>
      )}
      {/* keyword */}
      {keyword && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: 16,
            fontSize: "1rem",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
            }}
          >
            Search for &apos;{keyword}&apos;
          </span>
        </div>
      )}
    </div>
  );
};
