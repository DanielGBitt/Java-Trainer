"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COURSES, COURSE_ORDER } from "@/data/courses";

export function CourseNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const activeClass = (href: string) =>
    isActive(href) ? "text-foreground bg-muted px-2 py-1 rounded-md font-medium" : "text-muted-foreground hover:text-foreground";

  return (
    <>
      {/* Desktop */}
      <nav className="hidden sm:flex items-center gap-1 text-sm">
        <Link href="/" className={activeClass("/")}>
          Inicio
        </Link>
        {/* Lógica directa — única con contenido */}
        <Link href="/c/logica-programacion/map" className={activeClass("/c/logica-programacion")}>
          🧠 Lógica
        </Link>
        <div className="relative">
          <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            Materias ▾
          </Button>
          {open && (
            <>
              <button
                aria-label="Cerrar menú"
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
                tabIndex={-1}
              />
              <div className="absolute right-0 top-9 z-20 w-72 rounded-lg border bg-card p-2 shadow-lg">
                <div className="space-y-1">
                  {COURSE_ORDER.map((id) => {
                    const c = COURSES.find((x) => x.id === id)!;
                    const available = c.categories.length > 0;
                    return (
                      <Link
                        key={c.id}
                        href={`/c/${c.id}/map`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted text-sm"
                      >
                        <span>{c.icon}</span>
                        <span className="flex-1 text-foreground">{c.title}</span>
                        {available ? (
                          <Badge className="bg-emerald-600 text-white text-[11px]">Disponible</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[11px]">
                            Próximamente
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        <Link href="/progress" className={activeClass("/progress")}>
          Progreso
        </Link>
      </nav>

      {/* Mobile */}
      <div className="sm:hidden flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menú">
          ☰
        </Button>
        {open && (
          <>
            <button aria-label="Cerrar menú" className="fixed inset-0 z-10 bg-black/20" onClick={() => setOpen(false)} tabIndex={-1} />
            <div className="fixed top-[53px] left-0 right-0 z-20 border-b bg-card p-4 shadow-lg">
              <div className="flex flex-col gap-1 text-sm">
                <Link href="/" onClick={() => setOpen(false)} className={`rounded-md px-3 py-2 ${isActive("/") ? "bg-muted text-foreground font-medium" : "text-muted-foreground"}`}>
                  Inicio
                </Link>
                <p className="px-3 pt-2 text-xs font-semibold tracking-wide text-muted-foreground">— Materias —</p>
                {COURSE_ORDER.map((id) => {
                  const c = COURSES.find((x) => x.id === id)!;
                  const available = c.categories.length > 0;
                  return (
                    <Link
                      key={c.id}
                      href={`/c/${c.id}/map`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 ${isActive(`/c/${c.id}`) ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                    >
                      <span>{c.icon}</span>
                      <span className="flex-1">{c.title}</span>
                      {available ? (
                        <Badge className="bg-emerald-600 text-white text-[11px]">Disponible</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[11px]">
                          Próximamente
                        </Badge>
                      )}
                    </Link>
                  );
                })}
                <Link
                  href="/progress"
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 mt-1 ${isActive("/progress") ? "bg-muted text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Progreso
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
