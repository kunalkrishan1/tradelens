"use client"

import { useEffect, useMemo, useState } from 'react'

const DEFAULT_END_OFFSET_MINUTES = 15 * 24 * 60
const featureUpdates = [
  'Cloud sync across desktop and mobile sessions',
  'Broker integrations with MT5, IBKR, and Rithmic',
  'Smarter analytics for trade performance and risk',
  'Faster journal capture and workflow automation',
]

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const parts = []
  if (hours) parts.push(`${hours}h`)
  if (minutes || hours) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)
  return parts.join(' ')
}

function formatTarget(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export default function MaintenancePage() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const handle = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(handle)
  }, [])

  const scheduledEnd = useMemo(() => {
    const envDate = process.env.NEXT_PUBLIC_MAINTENANCE_END
    return envDate ? new Date(envDate) : new Date(Date.now() + DEFAULT_END_OFFSET_MINUTES * 60 * 1000)
  }, [])

  const remainingMs = Math.max(0, scheduledEnd.getTime() - now.getTime())
  const isComplete = remainingMs === 0
  const targetLabel = formatTarget(scheduledEnd)
  const statusText = isComplete ? 'Final checks in progress' : 'Expected back online'
  const countdownText = isComplete ? 'Less than a minute' : formatDuration(remainingMs)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_30%),#020617] flex items-center justify-center px-6 py-10 text-white">
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-violet-500/30 via-cyan-400/10 to-slate-500/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-violet-900/30 backdrop-blur-xl">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-10">
            <section className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.5)] animate-pulse" />
                Live maintenance updates enabled
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/50">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 text-4xl shadow-lg shadow-cyan-500/20">
                  🛠️
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  TradeLens is undergoing maintenance
                </h1>
                <p className="mt-4 max-w-xl text-slate-300 leading-relaxed">
                  We’re performing a scheduled upgrade to improve sync reliability, expand broker coverage, and accelerate your trading intelligence.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Status</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{statusText}</p>
                  <p className="mt-2 text-sm text-slate-400">Current maintenance window</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Estimated return</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{countdownText}</p>
                  <p className="mt-2 text-sm text-slate-400">Target recovery: {targetLabel}</p>
                </div>
              </div>
            </section>

            <aside className="space-y-6 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 md:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">What’s included</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Professional upgrade in progress</h2>
              </div>
              <ul className="space-y-3">
                {featureUpdates.map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-200 shadow-sm shadow-slate-950/10">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-[1.75rem] border border-slate-800/80 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Need assistance?</p>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  Our team is on standby. For immediate updates, reach out at{' '}
                  <a href="mailto:support@tradelens.trade" className="font-semibold text-cyan-300 transition hover:text-cyan-200">support@tradelens.trade</a>.
                </p>
              </div>
            </aside>
          </div>

          <div className="border-t border-white/10 bg-slate-950/80 px-6 py-6 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Last updated</p>
                <p className="mt-2 text-sm text-slate-300">Automatic refresh every second for an accurate countdown.</p>
              </div>
              <div className="rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-300">
                © 2026 TradeLens • Built for disciplined traders
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
