// Main

import React, { useRef, useEffect, useState } from "react";
import background from "../assets/groupHorizon.webp";

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
  const [numImages, setNumImages] = useState(0);
  const [cachedImages, setCachedImages] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const newWidth = Math.ceil(container.clientHeight * aspectRatio);
      setImgWidth(newWidth);
      setContainerWidth(container.clientWidth);
    };
    img.src = background;

    const handleResize = () => {
      setContainerWidth(container.clientWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (imgWidth !== 0 && containerWidth !== 0) {
      const numPreloadImages = Math.ceil(containerWidth / imgWidth) + 1;
      setNumImages(numPreloadImages);
      // 이미지 캐싱
      const images = Array.from({ length: numPreloadImages }, () => new Image());
      images.forEach((image, index) => {
        image.onload = () => {
          setCachedImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = image;
            return newImages;
          });
        };
        image.src = background;
      });
    }
  }, [imgWidth, containerWidth]);

  // 두 개의 이미지를 연결하여 무한 스크롤 효과를 구현합니다.
  const connectedImages = [];
  for (let i = 0; i < 2; i++) {
    connectedImages.push(
      ...cachedImages.map((image, index) => (
        <img
          key={`${i}-${index}`} // 고유한 키 생성
          src={image.src}
          alt="background"
          style={{
            width: `${imgWidth}px`,
            height: "100%",
            objectFit: "cover",
            objectPosition: "left",
            marginLeft: `-${index * imgWidth}px`, // 이미지를 왼쪽으로 이동시킴
            animation: "scroll 20s linear infinite",
          }}
        />
      ))
    );
  }

  return (
    <div className="BackgroundScroll" style={{ overflow: "hidden", position: "relative", minHeight: "100vh" }}>
      <style>{scrollKeyframes}</style>
      <div ref={containerRef} className="background" style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", height: "100%" }}>{connectedImages}</div>
      </div>
    </div>
  );
};

export default BackgroundScroll;
