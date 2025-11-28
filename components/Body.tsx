"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import Table from "./Table";
import DownloadBillty from "./DownloadBillty";

export type itemType = {
  quantity: string;
  goods: string;
  actualWeight: string;
};

export type dataType = {
  serialNumber: string;
  consignor: string;
  consignee: string;
  cnNumber: string;
  cnDate: Date | null;
  from: string;
  to: string;
  vehicleNumber: string;
  totalWeight: string;
  items: itemType[];
};

export default function Body() {
  const [items, setItems] = useState<itemType[]>([]);
  const [data, setdata] = useState<dataType>({
    serialNumber: "",
    consignor: "",
    consignee: "",
    cnNumber: "",
    cnDate: null,
    from: "",
    to: "",
    vehicleNumber: "",
    totalWeight: "",
    items: items,
  });
  useEffect(() => {
    setdata({ ...data, items: items });
  }, [items]);

  return (
    <div className="px-2 py-4">
      <Input
        name="Serial Number"
        placeholder="serial number"
        onChangeFunc={(e: any) => {
          setdata({ ...data, serialNumber: e.target.value });
        }}
      />
      <Input
        name="Consignor"
        placeholder="consignor"
        onChangeFunc={(e: any) => {
          setdata({ ...data, consignor: e.target.value });
        }}
      />
      <Input
        name="Consignee"
        placeholder="consignee"
        onChangeFunc={(e: any) => {
          setdata({ ...data, consignee: e.target.value });
        }}
      />
      <Input
        name="CN Number"
        placeholder="cn number"
        onChangeFunc={(e: any) => {
          setdata({ ...data, cnNumber: e.target.value });
        }}
      />
      <Input
        name="CN Date"
        placeholder="cn date"
        onChangeFunc={(e: any) => {
          setdata({ ...data, cnDate: e.target.value });
        }}
        inputType="date"
      />
      <Input
        name="From"
        placeholder="from"
        onChangeFunc={(e: any) => {
          setdata({ ...data, from: e.target.value });
        }}
      />
      <Input
        name="To"
        placeholder="to"
        onChangeFunc={(e: any) => {
          setdata({ ...data, to: e.target.value });
        }}
      />
      <Table items={items} setItems={setItems} />
      <Input
        name="Total Weight"
        placeholder="total weight"
        onChangeFunc={(e: any) => {
          setdata({ ...data, totalWeight: e.target.value });
        }}
      />
      <Input
        name="Vehicle Number"
        placeholder="vehicle number"
        onChangeFunc={(e: any) => {
          setdata({ ...data, vehicleNumber: e.target.value });
        }}
      />
      <DownloadBillty data={data} />
    </div>
  );
}
