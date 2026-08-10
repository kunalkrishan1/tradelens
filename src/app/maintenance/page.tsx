'use client'

import { useEffect, useState } from 'react'

const END_DATE = new Date('2026-08-25T23:59:59').getTime()

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = END_DATE - now

      if (distance <= 0) {
        setTimeLeft('Maintenance completed')
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">🛠️ TradeLens is under maintenance</h1>
        <p className="text-gray-400 mb-6">We're upgrading the platform.</p>

        <div className="text-3xl font-mono bg-gray-900 px-6 py-4 rounded-2xl border border-gray-800">
          {timeLeft}
        </div>
      </div>
    </main>
  )
}