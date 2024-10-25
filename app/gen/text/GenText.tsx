export const runtime = "edge";

interface Props {
  images: {
    [keyof: string]: string;
  };
  text: string;
  scale: number;
}

export const GenTextComponent = ({ images, text, scale }: Props) => {
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
          right: 12,
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
        <div style={{ fontSize: "1.3rem" }}>0xspeeeeeeed-frame | Base Mini-hackathon Seoul</div>
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
          fontSize:
            Math.min(
              Math.max(0.3 * Math.pow(text.length * scale, 0.33), 0.8),
              2
            ) + "rem",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "1.2",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
};
