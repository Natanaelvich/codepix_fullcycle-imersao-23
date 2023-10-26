import "@/styles/sass/globals.scss";
import BankContext from "../context/BankContext";

type AppProps = {
    Component: any;
    pageProps: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BankContext.Provider
      value={{
        name: process.env.NEXT_PUBLIC_BANK_NAME as string,
        code: process.env.NEXT_PUBLIC_BANK_CODE as string,
        get cssCode() {
          return `bank${this.code}`;
        },
      }}
    >
      <Component {...pageProps} />
    </BankContext.Provider>
  );
}

export default MyApp;
