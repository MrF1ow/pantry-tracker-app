import Button from "@mui/material/Button";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { useRouter } from "next/router";

interface NavButtonProps {
  text: string;
  size: "small" | "medium" | "large";
  route: string;
  width?: string;
  height?: string;
  textSize?: string;
}

const NavButton = ({
  text,
  size,
  route,
  width,
  height,
  textSize,
}: NavButtonProps) => {
  const router = useRouter();
  const sizeMap: Record<string, SxProps<Theme>> = {
    small: { fontSize: "0.75rem", padding: "4px 8px" },
    medium: { fontSize: "1rem", padding: "8px 16px" },
    large: { fontSize: "1.25rem", padding: "12px 24px" },
  };

  const buttonStyles: SxProps<Theme> = {
    width: width || "auto",
    height: height || "auto",
    ...sizeMap[size],
    fontSize: textSize || (sizeMap[size] as any)?.fontSize,
  };

  return (
    <Button
      variant="contained"
      sx={buttonStyles}
      onClick={() => router.push(route)}
    >
      {text}
    </Button>
  );
};

export default NavButton;
