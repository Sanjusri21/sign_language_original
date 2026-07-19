import logoImg from "../../imports/ChatGPT_Image_Jun_6__2026__01_30_41_PM.png";

interface SignAuraLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
}

export function SignAuraLogo({ size = 40, showText = false, textSize = "text-2xl" }: SignAuraLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ flexShrink: 0 }}
      >
        <defs>
          <filter id="sl-white-off" colorInterpolationFilters="sRGB"
            x="0%" y="0%" width="100%" height="100%">
            {/*
              Keeps RGB values unchanged.
              New alpha = -R -G -B + 3:
                white  (1,1,1)       → 0   fully transparent
                blue   (.23,.5,.83)  → 1.44 → clipped → fully opaque
                silver (.75,.75,.75) → 0.75 → semi-opaque (lighter fist preserved)
            */}
            <feColorMatrix
              type="matrix"
              values="1  0  0  0  0
                      0  1  0  0  0
                      0  0  1  0  0
                     -1 -1 -1  0  3"
            />
          </filter>
        </defs>

        {/* Filter applied directly to the image element — modifies pixel alpha, no mask needed */}
        <image
          href={logoImg}
          x="0"
          y="0"
          width="200"
          height="200"
          filter="url(#sl-white-off)"
        />
      </svg>

      {showText && (
        <span
          className={`${textSize} font-semibold bg-gradient-to-r from-blue-primary via-purple-primary to-[#a0bcff] bg-clip-text text-transparent`}
        >
          SignAura
        </span>
      )}
    </div>
  );
}
