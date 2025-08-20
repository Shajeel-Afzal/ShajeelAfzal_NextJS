"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"

// Shared nav items with anchors on the page
const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#skills", label: "Skills" },
  { href: "#themes", label: "Themes" },
]

export function SiteHeaderCreative() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const sectionIds = useMemo(() => navItems.map((n) => n.href.replace('#', '')), [])

  useEffect(() => {
    // Scroll progress indicator
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      setProgress(pct)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    // Active section highlighting via IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const opts: IntersectionObserverInit = { root: null, rootMargin: '0px 0px -70% 0px', threshold: 0 }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .map((e) => (e.target as HTMLElement).id)
      if (visible[0]) setActive(visible[0])
    }, opts)
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Scroll progress bar (reduced motion friendly) */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[2px] bg-transparent"
        aria-hidden
      >
        <div
          className="h-full bg-gradient-to-r from-primary/90 via-primary to-primary/70 transition-[width] duration-150 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Glass header */}
      <div className="border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link href="#home" className="group flex items-center gap-2" onClick={close}>
              <span className="relative inline-flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span className="absolute inline-block h-2 w-2 rounded-full bg-primary/30 blur-[2px] group-hover:bg-primary/40 transition-colors" aria-hidden />
              </span>
              <span className="font-semibold tracking-tight">Shajeel Afzal</span>
              <span className="sr-only">Go to home</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {navItems.map((item) => {
                const id = item.href.replace('#', '')
                const isActive = active === id
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      `group relative rounded-md px-3 py-2 text-sm font-medium ` +
                      (isActive
                        ? 'text-primary'
                        : 'text-foreground/90 hover:text-foreground')
                    }
                  >
                    <span>{item.label}</span>
                    <span
                      className={
                        `pointer-events-none absolute inset-x-2 -bottom-0.5 h-px origin-left bg-primary/70 ` +
                        `scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 ` +
                        (isActive ? 'scale-x-100' : '')
                      }
                      aria-hidden
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex">
                <ThemeSwitcher />
              </div>
              <Link href="#consultation">
                <Button size="sm" className="hidden md:inline-flex bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-sm hover:brightness-110">
                  Hire me
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={
          `md:hidden overflow-hidden border-b bg-background ` +
          `transition-[max-height,opacity] duration-200 ease-out ` +
          (open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')
        }
        aria-hidden={!open}
      >
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/60"
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
            <Link href="#consultation" onClick={close}>
              <Button className="mt-2 w-full">Hire me</Button>
            </Link>
            <div className="mt-2">
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      </div>

      {/* Skip link for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
    </header>
  )
}

export default SiteHeaderCreative
