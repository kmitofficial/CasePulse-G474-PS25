/* eslint-disable react/prop-types */
"use client"

import React from "react"
import Papa from "papaparse"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts"

// ------------- Utils -------------
const isNumberLike = (v) => {
  if (v === null || v === undefined || v === "") return false
  const n = Number(v)
  return Number.isFinite(n)
}
const isDateLike = (v) => {
  if (v === null || v === undefined || v === "") return false
  const t = Date.parse(v)
  return Number.isFinite(t)
}
const clamp = (n, a, b) => Math.max(a, Math.min(n, b))

function hashString(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i)
  return (h >>> 0).toString(36)
}

function analyzeColumns(rows, fields, maxRowsForType = 1000) {
  const sample = rows.slice(0, maxRowsForType)
  const result = []

  for (const name of fields) {
    const vals = sample.map((r) => r?.[name])
    const present = vals.filter((v) => v !== null && v !== undefined && v !== "")
    const missingPct = vals.length ? Math.round(((vals.length - present.length) / vals.length) * 100) : 0

    let detected = "categorical"
    if (present.length && present.every(isNumberLike)) detected = "number"
    else if (present.length && present.every(isDateLike)) detected = "date"

    const uniqueSet = new Map()
    for (const v of present) {
      const key = detected === "number" ? Number(v) : detected === "date" ? new Date(v).getFullYear() : String(v)
      uniqueSet.set(key, (uniqueSet.get(key) || 0) + 1)
    }
    const unique = uniqueSet.size

    let chartData = []
    let xLabel = ""
    if (detected === "number") {
      const nums = present.map((v) => Number(v)).sort((a, b) => a - b)
      const min = nums[0] ?? 0
      const max = nums[nums.length - 1] ?? 0
      const bins = 8
      const binWidth = (max - min || 1) / bins
      const buckets = Array.from({ length: bins }, () => 0)
      for (const n of nums) {
        let idx = Math.floor((n - min) / binWidth)
        if (idx === bins) idx = bins - 1
        buckets[idx]++
      }
      chartData = buckets.map((c, i) => ({
        key: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
        count: c,
      }))
      xLabel = "range"
    } else if (detected === "date") {
      const yearCounts = new Map()
      for (const v of present) {
        const y = new Date(v).getFullYear()
        yearCounts.set(y, (yearCounts.get(y) || 0) + 1)
      }
      const years = Array.from(yearCounts.keys()).sort((a, b) => a - b)
      chartData = years.map((y) => ({ key: String(y), count: yearCounts.get(y) }))
      xLabel = "year"
    } else {
      const entries = Array.from(uniqueSet.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
      chartData = entries.map(([k, c]) => ({ key: String(k), count: c }))
      xLabel = "category"
    }

    result.push({
      name,
      type: detected,
      missingPct,
      unique,
      xLabel,
      chartData,
      total: vals.length,
    })
  }

  return result
}

function MiniBarChart({ data, accent = "var(--color-chart-2)" }) {
  const [hoverIndex, setHoverIndex] = React.useState(-1)
  return (
    <div className="w-full h-24">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 2, left: 0, right: 0, bottom: 2 }}>
          <CartesianGrid
            vertical={false}
            stroke="color-mix(in oklch, var(--color-foreground) 10%, transparent)"
            strokeDasharray="3 3"
          />
          <XAxis dataKey="key" hide tickLine={false} axisLine={false} />
          <YAxis hide tickLine={false} axisLine={false} />
          <Tooltip
            wrapperStyle={{ zIndex: 50, pointerEvents: "auto" }}
            cursor={{ fill: "color-mix(in oklch, var(--color-chart-2) 8%, transparent)" }}
            contentStyle={{
              background: "color-mix(in oklch, var(--color-background) 96%, black)",
              border: "1px solid color-mix(in oklch, var(--color-chart-2) 25%, transparent)",
              color: "var(--color-foreground)",
              borderRadius: 8,
            }}
            labelStyle={{ color: "var(--color-muted-foreground)" }}
            itemStyle={{ color: "var(--color-foreground)" }}
          />
          <Bar dataKey="count" isAnimationActive animationDuration={500} radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(-1)}
                fill={accent}
                style={{
                  transition: "transform 200ms ease, filter 200ms ease",
                  transformOrigin: "bottom",
                  transform: hoverIndex === i ? "scaleY(1.1)" : "scaleY(1)",
                  filter:
                    hoverIndex === i
                      ? "drop-shadow(0 0 8px color-mix(in oklch, var(--color-chart-2) 60%, transparent))"
                      : "none",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ColumnCard({ col, accent }) {
  return (
    <div
      className="rounded-xl p-4 border backdrop-blur-sm"
      style={{
        borderColor: "color-mix(in oklch, var(--color-chart-2) 22%, transparent)",
        background: "color-mix(in oklch, #000 18%, transparent)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className="text-sm font-medium relative"
          style={{ color: "var(--color-foreground)", zIndex: 2 }}
          title={col.name}
        >
          {col.name}
        </div>
        <div
          className="text-xs uppercase tracking-wide px-2 py-0.5 rounded-full"
          style={{ color: "var(--color-background)", backgroundColor: "var(--color-chart-2)", fontWeight: 700 }}
        >
          {col.type}
        </div>
      </div>
      <MiniBarChart data={col.chartData} accent={accent} />
      <div className="mt-3 flex items-center gap-3 text-xs">
        <span style={{ color: "var(--color-muted-foreground)" }}>{col.unique} unique</span>
        <span className="opacity-30">•</span>
        <span style={{ color: "var(--color-muted-foreground)" }}>{col.missingPct}% missing</span>
      </div>
    </div>
  )
}

function CompactTable({ rows, fields }) {
  const showFields = fields.slice(0, 10)
  const visibleRows = rows.slice(0, 20)
  return (
    <div
      className="overflow-auto rounded-xl border"
      style={{ borderColor: "color-mix(in oklch, var(--color-chart-2) 22%, transparent)" }}
    >
      <table className="min-w-full text-sm" style={{ tableLayout: "fixed" }}>
        <thead
          className="sticky top-0 z-20"
          style={{
            background: "color-mix(in oklch, #000 70%, transparent)",
            backdropFilter: "blur(8px)",
          }}
        >
          <tr>
            {showFields.map((f) => (
              <th
                key={f}
                className="text-left font-semibold px-3 py-2 truncate"
                style={{
                  color: "var(--color-chart-2)",
                  borderBottom: "1px solid color-mix(in oklch, var(--color-chart-2) 22%, transparent)",
                }}
                title={f}
              >
                {f}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((r, i) => (
            <tr
              key={i}
              className="border-t"
              style={{ borderColor: "color-mix(in oklch, var(--color-foreground) 6%, transparent)" }}
            >
              {showFields.map((f) => (
                <td
                  key={f}
                  className="px-3 py-2 whitespace-nowrap overflow-visible relative"
                  style={{ color: "var(--color-foreground)", zIndex: 1 }}
                  title={String(r?.[f] ?? "")}
                >
                  <span className="block truncate">{String(r?.[f] ?? "")}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ------------- Main Component -------------
export default function DataSetExplorer({ title = "Dataset Explorer", previewRows = 200, className = "" }) {
  const [tab, setTab] = React.useState("detail")
  const [dataset, setDataset] = React.useState(null)
  const accent = "var(--color-chart-2)"

  async function handleFile(file) {
    if (!file) return
    const text = await file.text()
    const parsed = Papa.parse(text, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true,
    })
    const allRows = Array.isArray(parsed.data) ? parsed.data.filter(Boolean) : []
    const fields =
      parsed?.meta?.fields && parsed.meta.fields.length
        ? parsed.meta.fields
        : allRows.length
          ? Object.keys(allRows[0])
          : []
    const rows = allRows.slice(0, previewRows)
    const columns = analyzeColumns(allRows, fields)
    const rowCount = allRows.length

    setDataset({
      title: file.name || title,
      fields,
      rowsSample: rows,
      rowCount,
      columns,
    })
  }

  function onSelectFile(e) {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  function UploadCard() {
    return (
      <div
        className="rounded-2xl p-6 border flex flex-col items-center justify-center text-center gap-4"
        style={{
          borderColor: "color-mix(in oklch, var(--color-chart-2) 30%, transparent)",
          background: "color-mix(in oklch, #000 20%, transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="text-balance">
          <h2 className="text-base md:text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
            Upload a CSV to get started
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted-foreground)" }}>
            We’ll analyze columns and compute summaries locally.
          </p>
        </div>
        <label
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer"
          style={{
            color: "var(--color-background)",
            backgroundColor: "var(--color-chart-2)",
            borderColor: "color-mix(in oklch, var(--color-chart-2) 60%, transparent)",
            boxShadow: "0 0 12px color-mix(in oklch, var(--color-chart-2) 45%, transparent)",
            fontWeight: 700,
          }}
        >
          <input type="file" accept=".csv,text/csv" className="hidden" onChange={onSelectFile} />
          <span>Choose CSV</span>
        </label>
        <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          Note: Only a preview subset of rows is shown.
        </p>
      </div>
    )
  }

  function Header() {
    return (
      <header className="mb-6 md:mb-8">
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3 border"
          style={{
            borderColor: "color-mix(in oklch, var(--color-chart-2) 22%, transparent)",
            background: "color-mix(in oklch, #000 22%, transparent)",
            backdropFilter: "blur(6px)",
          }}
        >
          <h1
            className="text-lg md:text-2xl font-semibold text-balance relative z-10"
            style={{ color: "var(--color-foreground)" }}
            title={dataset?.title || title}
          >
            {dataset?.title || title}
          </h1>
          <div className="flex items-center gap-2">
            <div
              className="text-xs md:text-sm px-3 py-1 rounded-full"
              style={{
                color: "var(--color-background)",
                backgroundColor: accent,
                boxShadow: "0 0 12px color-mix(in oklch, var(--color-chart-2) 45%, transparent)",
                fontWeight: 700,
              }}
            >
              Data Card
            </div>
            <label
              className="text-xs md:text-sm px-3 py-1 rounded-full border cursor-pointer"
              style={{
                color: "var(--color-foreground)",
                borderColor: "color-mix(in oklch, var(--color-chart-2) 25%, transparent)",
                background: "color-mix(in oklch, #000 30%, transparent)",
                backdropFilter: "blur(4px)",
              }}
              title="Replace CSV"
            >
              <input type="file" accept=".csv,text/csv" className="hidden" onChange={onSelectFile} />
              Replace CSV
            </label>
          </div>
        </div>
      </header>
    )
  }

  function Tabs() {
    const tabs = [
      { id: "detail", label: "Detail" },
      { id: "compact", label: "Compact" },
      { id: "columns", label: "Column" },
    ]
    return (
      <nav className="mb-5 flex items-center gap-2">
        {tabs.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-3 py-1.5 rounded-full text-sm transition-colors border"
              style={{
                color: active ? "var(--color-background)" : "var(--color-foreground)",
                backgroundColor: active
                  ? "var(--color-chart-2)"
                  : "color-mix(in oklch, var(--color-chart-2) 8%, transparent)",
                borderColor: active
                  ? "color-mix(in oklch, var(--color-chart-2) 90%, transparent)"
                  : "color-mix(in oklch, var(--color-chart-2) 25%, transparent)",
              }}
            >
              {t.label}
            </button>
          )
        })}
      </nav>
    )
  }

  const About = () => {
    if (!dataset) return null
    const fields = dataset.fields || []
    const rows = dataset.rowsSample || []
    return (
      <div
        className="rounded-2xl p-5 border"
        style={{
          borderColor: "color-mix(in oklch, var(--color-chart-2) 22%, transparent)",
          background: "color-mix(in oklch, #000 16%, transparent)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2 className="text-base font-semibold mb-1" style={{ color: "var(--color-foreground)" }}>
          About this file
        </h2>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Parsed {dataset.rowCount ?? rows.length} rows • {fields.length} columns • Previewing {rows.length} rows
        </p>
      </div>
    )
  }

  const containerVars = {
    ["--color-background"]: "#000",
    ["--color-foreground"]: "#e5e7eb",
    ["--color-muted-foreground"]: "#9ca3af",
    ["--color-chart-2"]: "#06b6d4", // cyan
  }

  const containerPadding = dataset ? "py-4" : "py-16"
  const containerMinHeight = dataset ? "auto" : "60vh"

  return (
    <main
      className={`${containerPadding} w-full rounded-3xl px-6 md:px-8 ${className}`}
      style={{
        ...containerVars,
        // transparent overlay: keep text light but no solid bg; Beams remain primary
        background: "transparent",
        color: "var(--color-foreground)",
        minHeight: containerMinHeight,
        // allow hovered content/tooltips to escape
        overflow: "visible",
      }}
    >
      <Header />
      <Tabs />

      {!dataset && <UploadCard />}

      {dataset && (
        <>
          {tab === "detail" && (
            <section className="space-y-6">
              <About />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(dataset.columns || []).map((c) => (
                  <ColumnCard key={c.name} col={c} accent={accent} />
                ))}
              </div>
            </section>
          )}

          {tab === "compact" && (
            <section className="space-y-4">
              <CompactTable rows={dataset.rowsSample || []} fields={dataset.fields || []} />
            </section>
          )}

          {tab === "columns" && (
            <section className="space-y-4">
              {(dataset.columns || []).map((c) => (
                <div
                  key={c.name}
                  className="rounded-2xl p-5 border overflow-visible"
                  style={{
                    borderColor: "color-mix(in oklch, var(--color-chart-2) 22%, transparent)",
                    background: "color-mix(in oklch, #000 16%, transparent)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative z-10">
                      <h3
                        className="text-base font-semibold"
                        style={{ color: "var(--color-foreground)" }}
                        title={c.name}
                      >
                        {c.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                        {c.unique} unique • {c.missingPct}% missing
                      </p>
                    </div>
                    <span
                      className="text-xs uppercase tracking-wide px-2 py-1 rounded-full"
                      style={{ color: "var(--color-background)", backgroundColor: accent, fontWeight: 700 }}
                    >
                      {c.type}
                    </span>
                  </div>
                  <MiniBarChart data={c.chartData} accent={accent} />
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  )
}
