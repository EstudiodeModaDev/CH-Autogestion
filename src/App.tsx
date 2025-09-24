// src/App.tsx
import { type FC, useState } from "react";
import LogoSiesa from "./assets/LogoSiesa.webp";
import LogoEDM   from "./assets/LogoEdem.png";

type LinkItem = { title: string; href: string };

const LINKS: LinkItem[] = [
  { title: "Estudio de moda",    href: "https://tinyurl.com/mv6b6xca" },
  { title: "DH Retail",          href: "https://tinyurl.com/mv6b6xca" },
  { title: "Denim Head",          href: "https://tinyurl.com/mv6b6xca" },
  { title: "Expensis",           href: "https://tinyurl.com/mv6b6xca" },
  { title: "Movimiento Visual",  href: "https://tinyurl.com/mv6b6xca" },
  { title: "Meta Graphics",      href: "https://tinyurl.com/mv6b6xca" },
];

const App: FC = () => {
  const [value, setValue] = useState("");

  const onSelect = (url: string) => {
    setValue(url);
    if (!url) return;
    window.location.href = url;
  };

  return (
    <main style={styles.page}>
      {/* Contenido centrado */}
      <section style={styles.center}>
        <h1 style={styles.mainTitle}>Portal Autogestión</h1>
        <img src={LogoEDM} alt="Estudio de Moda" style={styles.logoEDM} />

        <div style={styles.form}>
          <label htmlFor="quicknav" style={styles.label}>Selecciona compañía</label>
          <div style={styles.borderGrad}>
            <div style={styles.selectShell}>
              <select
                id="quicknav"
                value={value}
                onChange={(e) => onSelect(e.target.value)}
                style={styles.select}
              >
                <option value="">— Selecciona una opción —</option>
                {LINKS.map((l) => (
                  <option key={l.href} value={l.href}>{l.title}</option>
                ))}
              </select>
              <span aria-hidden="true" style={styles.caret}>▾</span>
            </div>
          </div>
            <img src={LogoSiesa} alt="Siesa" style={styles.logoSiesa} />
        </div>
      </section>
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100svh",
    width: "100%",
    background: "#fff",
    color: "#0B2B6A",
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },

  center: {
    width: "min(760px, 92%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 16,
  },

  mainTitle: {
    fontSize: "clamp(22px, 4vw, 28px)",
    fontWeight: 800,
    margin: "0 0 8px 0",
    color: "#0B2B6A",
    letterSpacing: "-0.02em",
  },

  logoEDM: { width: 150, height: "auto", marginBottom: 8 },

  form: { width: "100%", display: "grid", gap: 10 },
  label: { fontSize: 14, fontWeight: 800, letterSpacing: ".06em" },

  borderGrad: {
    padding: 1.5,
    borderRadius: 12,
    background: "linear-gradient(135deg, #2D6CF6, #4CC2FF)",
    boxShadow: "0 12px 36px rgba(13,71,161,0.10)",
  },
  selectShell: {
    position: "relative",
    borderRadius: 10,
    background: "#fff",
    border: "1px solid #D9E2F1",
  },
  select: {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    width: "100%",
    height: 50,
    padding: "0 44px 0 14px",
    border: "none",
    outline: "none",
    borderRadius: 10,
    background: "transparent",
    color: "#0B2B6A",
    fontSize: 15,
    fontWeight: 700,
  },
  caret: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 18,
    color: "#2D6CF6",
    pointerEvents: "none",
  },
  hint: { color: "#5B6B8C", fontSize: 12 },

  // Nuevo: logo Siesa debajo del select con ~2 saltos de línea
  logoSiesa: {
    height: 72,                 // ajusta si lo quieres un poco más grande
    width: "auto",
    objectFit: "contain",
    userSelect: "none",
    display: "block",
    margin: "2em auto 0",       // centra horizontal y da el espacio arriba
    // alternativa equivalente:
    // justifySelf: "center",
  },
};


export default App;
