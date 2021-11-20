import { NextPage } from "next";
import { useEffect, useState } from "react";
import LayoutComponent from "@components/layout.component";
import { countryList } from "@helper/constants";
import Link from "next/link";
interface Data {
  Cases: number;
  Deaths: number;
  Recovered: number;
  Active: number;
}
const Index: NextPage = () => {
  const [data, setData] = useState<Data | null>(null);
  const [country, setCountry] = useState<string>("");
  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <LayoutComponent isLoading={!data}>
      <div className="flex flex-col h-screen justify-center items-center">
        <h1>World Wide</h1>
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
          <div className="flex justify-evenly">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">All</option>

              {Object.keys(countryList).map((country) => (
                <option key={country} value={country}>
                  {
                    //@ts-ignore
                    countryList[country]
                  }
                </option>
              ))}
            </select>
            {country !== "" && (
              <Link href={`/${country}`}>
                <a className="capitalize  ml-2 px-4 ring-1 ring-sky-700 rounded-sm">
                  Get Details
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};
export default Index;
