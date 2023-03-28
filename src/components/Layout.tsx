import { Poppins } from "next/font/google";
import clsx from "clsx";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={clsx("min-h-screen", poppins.className)}>{children}</div>
  );
}
