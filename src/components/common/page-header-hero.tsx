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
        "relative max-w-full overflow-hidden pt-[calc(var(--site-header-offset)+0.25rem)] select-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex min-h-[180px] w-full flex-col items-center justify-center px-4 py-8 sm:min-h-[220px] sm:px-6 md:min-h-[280px] md:px-8",
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

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center space-y-3 text-center text-white sm:space-y-4">
          <h1
            className={cn(
              "text-[1.75rem] font-bold leading-tight tracking-tight uppercase sm:text-[2.25rem] md:text-[3rem]",
              titleClassName,
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <div className="max-w-2xl text-sm leading-7 text-white/90 sm:text-[15px] md:text-base">
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
