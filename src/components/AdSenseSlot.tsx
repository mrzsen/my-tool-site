"use client";

import { useEffect } from "react";

interface AdSenseSlotProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseSlot({ slot, style, className }: AdSenseSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-9418499386631481"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
