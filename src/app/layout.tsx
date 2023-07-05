import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Interactive Things",
    template: '%s | "Interactive Things"',
  },
  authors: { name: "byungseon", url: "https://github.com/rkdqudtjs1" },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
