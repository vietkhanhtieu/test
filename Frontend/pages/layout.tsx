import Head from "next/head";
import { StoreProvider } from "@/app/StoreProvider";

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <StoreProvider>
        {children}
      </StoreProvider>
    </>
  );
}

export default BaseLayout
