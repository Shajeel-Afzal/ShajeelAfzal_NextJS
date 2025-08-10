"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"

const navItems = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#skills", label: "Skills" },
    { href: "#themes", label: "Themes" },
]

export function SiteHeader() {
    const [open, setOpen] = useState(false)

    const close = () => setOpen(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <Link href="#home" className="flex items-center gap-2" onClick={close}>
                        <span className="inline-block h-2 w-2 rounded-full bg-primary" aria-hidden />
                        <span className="font-semibold tracking-tight">Shajeel Afzal</span>
                        <span className="sr-only">Go to home</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted/60"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex">
                            <ThemeSwitcher />
                        </div>
                        <Link href="#consultation">
                            <Button size="sm" className="hidden md:inline-flex">Hire me</Button>
                        </Link>
                        {/* Mobile menu toggle */}
                        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile panel */}
            {open && (
                <div className="md:hidden border-t bg-background">
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
            )}
        </header>
    )
}

export default SiteHeader
