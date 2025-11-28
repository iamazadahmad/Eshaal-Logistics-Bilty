// components/DownloadBillty.tsx
"use client";
import React from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { dataType } from "./Body";

async function fetchArrayBuffer(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch template");
  return await res.arrayBuffer();
}

// helper to trigger download
function downloadBlob(blob: Blob, filename = "filled_billty.docx") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function DownloadBillty({
  templateUrl = "Eshaal_Logistics_Billty.docx", // put the template in public/
  data,
}: {
  templateUrl?: string;
  data: dataType;
}) {
  const handleGenerate = async () => {
    try {
      // 1. fetch template as ArrayBuffer
      const arrayBuffer = await fetchArrayBuffer(templateUrl);

      // 2. init PizZip + Docxtemplater
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // 3. prepare items with sno if your template uses it
      const itemsWithSno = (data.items || []).map((it, i) => ({
        ...it,
        sno: i + 1,
      }));

      // 4. prepare template data (format date if needed)
      const templateData = {
        serialNumber: data.serialNumber ?? "",
        consignor: data.consignor ?? "",
        consignee: data.consignee ?? "",
        cnNumber: data.cnNumber ?? "",
        cnDate: data.cnDate
          ? new Date(data.cnDate).toLocaleDateString("en-GB")
          : "",
        from: data.from ?? "",
        to: data.to ?? "",
        vehicleNumber: data.vehicleNumber ?? "",
        totalWeight: data.totalWeight ?? "",
        items: itemsWithSno,
      };

      // 5. render
      doc.render(templateData);

      // 6. generate and download
      const outBuffer = doc.getZip().generate({ type: "blob" });
      downloadBlob(outBuffer, "filled_billty.docx");
    } catch (err: any) {
      console.error("Error generating docx:", err);
      alert("Failed to generate file: " + (err.message || err));
    }
  };

  return (
    <div>
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Bilty
      </button>
    </div>
  );
}
