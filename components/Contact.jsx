'use client'

import { useState } from 'react'
import Image from 'next/image'
import SketchField from './SketchField'
import SketchButton from './SketchButton'
import FillHeading from './FillHeading'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Request failed')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="mt-10 w-full overflow-x-clip bg-[#F0E4CA] font-primary tracking-[0.02em] md:mt-16"
    >
      <div className="grid grid-cols-1 items-center gap-10 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-12 lg:gap-20 lg:px-10">
        {/* Left: heading + form */}
        <div className="flex w-full flex-col gap-5">
          <FillHeading className="tracking-tighter md:text-[clamp(3.5rem,7vw,8rem)]">
            Contact me
          </FillHeading>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <SketchField
              label="Full name"
              name="name"
              type="text"
              placeholder="Full name"
              autoComplete="name"
              required
            />
            <SketchField
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
            />
            <SketchField
              label="Company name or website"
              name="company"
              type="text"
              placeholder="Company name or website"
              autoComplete="organization"
            />
            <SketchField
              as="textarea"
              rows={1}
              label="Your idea"
              name="message"
              placeholder="What's your ideas? How can I help?"
              required
            />

            <div className="flex items-center justify-between gap-4">
              <p role="status" className="text-sm text-black sm:text-base">
                {status === 'sent' && 'Thanks! I will get back to you soon.'}
                {status === 'error' && errorMsg}
              </p>

              <SketchButton
                type="submit"
                size="sm"
                disabled={status === 'sending'}
                className="shrink-0"
              >
                {status === 'sending' ? 'Sending' : 'Send'}
              </SketchButton>
            </div>
          </form>
        </div>

        {/* Right: illustration */}
        <div className="flex w-full items-center justify-center">
          <Image
            src="/contact-illustration.png"
            alt="Sketch illustration of mountains reflected in a lake"
            width={700}
            height={560}
            priority
            className="h-auto w-full max-w-[420px] md:max-w-full"
          />
        </div>
      </div>
    </section>
  )
}
