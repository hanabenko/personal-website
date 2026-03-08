"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  placeholderLabel?: string;
  /** Larger sizes = sharper on retina; use for hero/featured images */
  sizes?: string;
  quality?: number;
  priority?: boolean;
  /** "contain" = show full image (no crop); "cover" = fill container (default) */
  objectFit?: "cover" | "contain";
};

/**
 * Shows an image from /public. If the image fails to load or is missing, shows a styled placeholder.
 * Add your photos to the public folder (e.g. public/hana.jpg, public/hero.jpg).
 */
export function Photo({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  placeholderLabel = "Photo",
  sizes,
  quality = 85,
  priority = false,
  objectFit = "cover",
}: PhotoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`photo-placeholder ${className}`}
        style={
          width && height
            ? { width, height }
            : fill
              ? { width: "100%", height: "100%", minHeight: "200px" }
              : { minHeight: "200px" }
        }
      >
        {placeholderLabel}
      </div>
    );
  }

  if (fill) {
    return (
      <div className={`photo-placeholder ${className}`} style={{ position: "relative", width: "100%", height: "100%", minHeight: "200px" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 720px) 280px, 360px"}
          quality={quality}
          priority={priority}
          style={{ objectFit, borderRadius: "var(--radius)" }}
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={className}
      quality={quality}
      onError={() => setError(true)}
      style={{ objectFit: "cover", borderRadius: "var(--radius)" }}
    />
  );
}
