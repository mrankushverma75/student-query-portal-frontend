import { ReactNode } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <div>{children}</div>;
}
