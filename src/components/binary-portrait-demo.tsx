"use client";

import { BinaryPortrait } from "@/components/ui/binary-portrait";

export default function BinaryPortraitDemo() {
  return (
    <div className="flex w-full justify-center px-4 py-10">
      <BinaryPortrait
        animated={true}
        animationDuration={1.2}
        backgroundColor="transparent"
        brightnessThreshold={0.22}
        className="h-[620px] w-full max-w-[520px]"
        color="rgba(255,255,255,0.82)"
        contrast={2.6}
        maxCharOpacity={0.95}
        minCharOpacity={0.06}
        objectFit="cover"
        objectPosition="center center"
        resolution={76}
        sourceImageOpacity={0.08}
        src="/images/tania-bust-bw.png"
      />
    </div>
  );
}
