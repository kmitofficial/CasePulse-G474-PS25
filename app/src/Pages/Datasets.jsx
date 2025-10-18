import React, { useState, useEffect } from "react";
import Beams from '../components/ui/Beams';
import Navbar from "@/components/Navbar";
import DatasetExplorer from "@/components/DataSetExplorer";
import Papa from "papaparse";
import DarkVeil from "@/components/DarkVeil";

export default function Datasets() {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
  const csvPath = import.meta.env.BASE_URL + "data/iclec.csv";
  fetch(csvPath)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.text();
    })
    .then(text => {
      const parsed = Papa.parse(text, { header: true });
      setCsvData(parsed.data);
    })
    .catch(err => console.error("Failed to load CSV:", err));
}, []);


  // Handler for manual CSV upload in DatasetExplorer
  const handleCsvUpload = (data) => {
    console.log("fetching data")
    setCsvData(data); // update state, no localStorage
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar className="relative z-20" />

      {/* Background Beams */}
      {/* <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="from-cyan-600 to-cyan-400"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div> */}
       <div className="fixed inset-0 z-0">
              <DarkVeil
                hueShift={40}
                noiseIntensity={0.05}
                scanlineIntensity={0.2}
                scanlineFrequency={5}
                warpAmount={0.1}
                speed={0.5}
                resolutionScale={1}
              />
              
            </div>

      {/* Page Header */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 sm:pt-32">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
          Indian Case Law Evaluation Corpus (ICLEC)
        </h1>
        <p className="text-sm md:text-base mb-4">
          Benchmark corpus for Indian Supreme Court judgments
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="rounded-full px-3 py-1.5 text-sm font-medium border bg-transparent"
            style={{
              borderColor: "color-mix(in oklch, #06b6d4 28%, transparent)",
              color: "white",
            }}
          >
            Code
          </button>
          <button
            className="rounded-full px-3 py-1.5 text-sm font-medium border"
            style={{
              borderColor: "color-mix(in oklch, #06b6d4 28%, transparent)",
              color: "white",
            }}
          >
            Download
          </button>
          <button
            className="rounded-full px-2.5 py-1.5 text-sm font-medium border"
            aria-label="More actions"
            style={{
              borderColor: "color-mix(in oklch, #06b6d4 20%, transparent)",
              color: "white",
            }}
          >
            •••
          </button>
        </div>
      </div>

      {/* About Dataset + Metadata Cards */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 mt-10 md:mt-12 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-6 lg:gap-8">
        {/* About Dataset */}
        <div
          className="rounded-2xl border bg-transparent backdrop-blur-sm p-5 md:p-6"
          style={{ borderColor: "color-mix(in oklch, #06b6d4 22%, transparent)" }}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-semibold">About Dataset</h2>
            <button
              className="rounded-full px-3 py-1.5 text-sm font-medium border"
              style={{
                borderColor: "color-mix(in oklch, #06b6d4 20%, transparent)",
                color: "white",
              }}
            >
              Edit
            </button>
          </div>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-white">
            <p>
              <strong>ICLEC</strong> (Version 1.0) is a research-ready corpus of Indian Supreme Court judgments,
              inspired by the CLERC benchmark. Unlike metadata-only datasets, ICLEC includes full text of each judgment,
              structured metadata, raw PDF text, and official sources.
            </p>
          </div>
        </div>

        {/* DatasetExplorer */}
        <div className="flex flex-col justify-start items-center w-full">
          <DatasetExplorer
            className="relative z-10 w-full rounded-2xl border px-4 md:px-8 bg-transparent backdrop-blur-md"
            style={{
              borderColor: "color-mix(in oklch, #06b6d4 28%, transparent)",
              boxShadow: "0 0 0 1px color-mix(in oklch, #06b6d4 10%, transparent)",
            }}
            onCsvUpload={handleCsvUpload}
          />
        </div>
      </div>

      {/* Quick Actions, Tips, Notes */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 mt-10 md:mt-12 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="rounded-xl p-5 border bg-transparent backdrop-blur-sm" style={{ borderColor: "color-mix(in oklch, #06b6d4 22%, transparent)" }}>
          <h3 className="text-sm font-semibold mb-2">Quick actions</h3>
          <ul className="text-xs leading-relaxed">
            <li>• Replace CSV to refresh analysis</li>
            <li>• Switch views: Detail, Compact, Column</li>
            <li>• Hover charts to inspect distributions</li>
          </ul>
        </div>
        <div className="rounded-xl p-5 border bg-transparent backdrop-blur-sm" style={{ borderColor: "color-mix(in oklch, #06b6d4 22%, transparent)" }}>
          <h3 className="text-sm font-semibold mb-2">Tips for clean CSVs</h3>
          <ul className="text-xs leading-relaxed">
            <li>• Consistent headers and data types</li>
            <li>• Use ISO dates (YYYY-MM-DD)</li>
            <li>• Avoid mixed units or encodings</li>
          </ul>
        </div>
        <div className="rounded-xl p-5 border bg-transparent backdrop-blur-sm" style={{ borderColor: "color-mix(in oklch, #06b6d4 22%, transparent)" }}>
          <h3 className="text-sm font-semibold mb-2">Notes</h3>
          <p className="text-xs">
            Your background beams remain the primary visual layer. These cards are transparent overlays to keep the
            focus on content while preserving the ambient effect.
          </p>
        </div>
      </div>
    </div>
  );
}
