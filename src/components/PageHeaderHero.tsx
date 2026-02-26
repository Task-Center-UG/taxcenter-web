import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderHeroProps = {
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  innerClassName?: string;
  titleClassName?: string;
};

export default function PageHeaderHero({
  title,
  subtitle,
  children,
  imageSrc = "/assets/images/header.jpeg",
  imageAlt,
  className,
  innerClassName,
  titleClassName,
}: PageHeaderHeroProps) {
  return (
    <div
      className={cn(
        "relative pt-[70px] lg:pt-[120px] max-w-full overflow-hidden select-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full min-h-[200px] md:min-h-[300px] flex flex-col items-center justify-center px-4",
          innerClassName,
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt || `Header ${title}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white w-full max-w-4xl space-y-4">
          <h1
            className={cn(
              "text-3xl md:text-5xl font-bold tracking-tight uppercase",
              titleClassName,
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <div className="text-sm md:text-base leading-relaxed text-white/90 max-w-2xl">
              {subtitle}
            </div>
          )}

          {children && (
            <div className="w-full flex justify-center">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
