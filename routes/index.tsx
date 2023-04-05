import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';

const url = 'https://api.coindesk.com/v2/bpi/currentprice.json';

export interface Price {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Bpi {
  USD: Usd;
  GBP: Gbp;
  EUR: Eur;
  CNY: Cny;
}

export interface Usd {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Gbp {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Eur {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Cny {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export const handler: Handlers<Price | null> = {
  async GET(_, ctx) {
    const resp = await fetch(url);

    if (resp.status === 200) {
      const price: Price = await resp.json();
      return ctx.render(price);
    }

    return ctx.render(null);
  },
};

export default function Home({ data }: PageProps<Price | null>) {
  if (!data) {
    return <h1> Data is not available</h1>;
  }

  return (
    <>
      <Head>
        <title>Bitcoin price checker</title>
      </Head>
      <div class="w-screen h-screen bg-gray-900">
        <div class="p-4 mx-auto max-w-screen-md">
          <img
            src="/bitcoin-logo.webp"
            class="w-32 h-32 mx-auto rounded-[50%]"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <p class="my-10 text(center 3xl white)">Bitcoin Price Checker</p>
          <p class="my-10 text(center 2xl white)">USD: ${data.bpi.USD.rate}</p>
          <p class="my-10 text(center 2xl white)">EUR: €{data.bpi.EUR.rate}</p>
          <p class="my-10 text(center 2xl white)">GBP: £{data.bpi.GBP.rate}</p>
          <p class="my-10 text(center 2xl white)">CNY: ¥{data.bpi.CNY.rate}</p>
          <p class="my-10 text(center md white)">
            Last fetched at : {data.time.updated}
          </p>
        </div>
      </div>
    </>
  );
}
