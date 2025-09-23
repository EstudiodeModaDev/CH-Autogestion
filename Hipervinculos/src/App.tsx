// src/App.tsx
import {type FC, useMemo, useState } from "react";

type LinkItem = {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
};

const LINKS: LinkItem[] = [
  { title: "Dashboard de Soporte", href: "/soporte", description: "Tickets y estado en tiempo real" },
  { title: "Solicitudes de TI", href: "/formatos", description: "Formularios y aprobaciones" },
  { title: "Reportes", href: "/reportes", description: "KPIs y métricas clave" },
  { title: "Colaboradores", href: "/colaboradores", description: "Directorio y perfiles" },
  { title: "Pico y Placa", href: "/pyp", description: "Reglas y configuración" },
];

// util: quita acentos y pasa a minúsculas
const canon = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

const App: FC = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = canon(query);
    if (!q) return LINKS;
    return LINKS.filter((l) => canon(l.title).includes(q));
  }, [query]);

  return (
    <main style={styles.page}>
      <div style={styles.bg} />
      <section style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Centro de Acceso Rápido</h1>
          <p style={styles.subtitle}>Elige una sección para continuar. (Página intermedia)</p>

          {/* Buscador */}
          <div style={styles.searchWrap} role="search">
            <input
              aria-label="Buscar por título"
              placeholder="Buscar… (p. ej., Reportes)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.searchInput}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={styles.clearBtn}
                aria-label="Limpiar búsqueda"
                title="Limpiar"
              >
                ✕
              </button>
            )}
            <span style={styles.resultCount} aria-live="polite">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </header>

        <nav aria-label="Navegación principal" style={styles.linksGrid}>
          {filtered.length === 0 ? (
            <div style={styles.empty}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>Sin resultados</div>
              <div style={{ opacity: 0.75, fontSize: 14 }}>
                No encontramos enlaces para “{query}”. Prueba con otro término.
              </div>
            </div>
          ) : (
            filtered.map((link) => {
              const isExternal = !!link.external || /^https?:\/\//i.test(link.href);
              return (
                <a
                  key={link.title}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  style={styles.linkItem}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)")
                  }
                >
                  <div style={styles.linkContent}>
                    <span style={styles.linkTitle}>{link.title}</span>
                    {link.description ? <span style={styles.linkDesc}>{link.description}</span> : null}
                  </div>
                  <span aria-hidden="true" style={styles.chevron}>
                    ↗
                  </span>
                </a>
              );
            })
          )}
        </nav>
      </section>
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100vw",
    overflowX: "hidden",
    background: "linear-gradient(120deg, #0f172a 0%, #0b1022 40%, #050816 100%)",
    color: "#e5e7eb",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol'",
  },
  bg: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(800px 300px at 70% 20%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(700px 400px at 20% 80%, rgba(236,72,153,0.12), transparent 60%)",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100vh",
    padding: "clamp(16px, 3vw, 28px)",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: { marginBottom: "clamp(12px, 2vw, 20px)" },
  title: { margin: 0, fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.05, color: "#f3f4f6" },
  subtitle: { marginTop: 8, marginBottom: 0, color: "#a3a3a3", fontSize: "clamp(12px, 2vw, 18px)" },

  // Search
  searchWrap: {
    marginTop: 16,
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: "1 1 420px",
    maxWidth: "min(720px, 100%)",
    height: 42,
    padding: "0 40px 0 14px",
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,0.25)",
    background: "rgba(2,6,23,0.6)",
    color: "#e5e7eb",
    outline: "none",
  },
  clearBtn: {
    position: "relative",
    right: 58,
    height: 30,
    padding: "0 10px",
    borderRadius: 8,
    border: "1px solid rgba(148,163,184,0.25)",
    background: "rgba(15,23,42,0.8)",
    color: "#cbd5e1",
    cursor: "pointer",
  },
  resultCount: { fontSize: 13, opacity: 0.8 },

  // Links
  linksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "clamp(10px, 1.8vw, 18px)",
    alignContent: "start",
    marginTop: 14,
  },
  linkItem: {
    gridColumn: "1 / -1",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textDecoration: "none",
    background: "rgba(2,6,23,0.6)",
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: 16,
    padding: "18px 16px",
    transition:
      "transform 120ms ease, box-shadow 120ms ease, background 120ms ease, border-color 120ms ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    color: "#e5e7eb",
  },
  linkContent: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 },
  linkTitle: {
    fontSize: "clamp(16px, 2.2vw, 22px)",
    fontWeight: 700,
    color: "#f9fafb",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  linkDesc: {
    fontSize: "clamp(12px, 1.6vw, 16px)",
    color: "#a1a1aa",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chevron: { fontSize: 18, opacity: 0.85, marginLeft: 12 },

  // Empty
  empty: {
    gridColumn: "1 / -1",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "28px 16px",
    border: "1px dashed rgba(148,163,184,0.25)",
    borderRadius: 16,
    background: "rgba(2,6,23,0.4)",
  },
};

export default App;
