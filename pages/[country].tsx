import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LayoutComponent from "@components/layout.component";
import { countryList } from "@helper/constants";
interface Data {
  Cases: number;
  Deaths: number;
  Recovered: number;
  Active: number;
}
const Index: NextPage = () => {
  const { country } = useRouter().query;
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    if (country) {
      fetch(`/api/${country}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [country]);
  return (
    // @ts-ignore
    <LayoutComponent title={countryList[country]} isLoading={!data}>
      <div className="flex flex-col h-screen justify-center items-center">
        <h1>Cases of {country}</h1>
        <div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="p-2">Total Cases</h4>
              <p>:</p>
              <p className="p-2">{data?.Cases}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="p-2">Total Deaths</h4>
              <p>:</p>
              <p className="p-2">{data?.Deaths}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="p-2">Total Recovered</h4>
              <p>:</p>
              <p className="p-2">{data?.Recovered}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <h4 className="p-2">Total Active</h4>
              <p>:</p>
              <p className="p-2">{data?.Active}</p>
            </div>
          </div>
        </div>
        <Link href="/">
          <a className="ml-2 px-4 ring-1 ring-sky-700 rounded-sm">Back</a>
        </Link>
      </div>
    </LayoutComponent>
  );
};
export default Index;
