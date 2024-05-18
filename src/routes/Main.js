import React, { useRef, useEffect, useState } from "react";
import background from "../assets/groupHorizon.png";

const scrollKeyframes = `
  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const BackgroundScroll = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const newWidth = Math.ceil(container.clientWidth * aspectRatio);
      setImgWidth(newWidth);
      setContainerWidth(container.clientWidth); // 초기 컨테이너 너비 설정
    };
    img.src = background;

    const handleResize = () => {
      setContainerWidth(container.clientWidth); // 컨테이너 너비 변경 시 업데이트
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 초기 이미지 한 개만 추가하여 화면에 보여주고, 나머지 이미지는 동적으로 추가하여 무한 스크롤되도록 구현
  const initialImages =
    imgWidth !== 0 && containerWidth !== 0 ? (
      <img
        key={0}
        src={background}
        alt="background"
        style={{
          width: `${imgWidth}px`,
          height: "100%",
          objectFit: "cover",
          objectPosition: "left",
          animation: "scroll 20s linear infinite",
        }}
      />
    ) : null;

  return (
    <div className="BackgroundScroll" style={{ overflow: "hidden", position: "relative", minHeight: "100vh" }}>
      <style>{scrollKeyframes}</style>
      <div ref={containerRef} className="background" style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", height: "100%" }}>
          {initialImages}
          {imgWidth !== 0 &&
            containerWidth !== 0 &&
            [...Array(Math.ceil(containerWidth / imgWidth) + 1)].map((_, index) => (
              <img
                key={index + 1}
                src={background}
                alt="background"
                style={{
                  width: `${imgWidth}px`,
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "left",
                  animation: "scroll 20s linear infinite",
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundScroll;
