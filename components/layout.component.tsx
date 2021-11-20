import { FC, ReactNode } from "react";
import Head from "next/head";
interface Props {
  children: ReactNode;
  title?: string;
  isLoading?: boolean;
}
const LayoutComponent: FC<Props> = ({ children, title, isLoading }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      {isLoading && (
        <div className="flex items-center justify-center absolute top-0 h-screen w-screen ">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
LayoutComponent.defaultProps = {
  title: "Covid 19 Tracker",
  isLoading: false,
};
export default LayoutComponent;
