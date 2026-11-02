const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const progress = document.getElementById("progress");

const readTheme = () => {
    try {
        return localStorage.getItem("tema");
    } catch {
        return null;
    }
};

const applyTheme = (theme) => {
    root.dataset.theme = theme;
    toggle.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
    try {
        localStorage.setItem("tema", theme);
    } catch {}
};

applyTheme(readTheme() ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

toggle.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("conteudo").scrollIntoView({ behavior: "smooth" });
});

const updateProgress = () => {
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};

addEventListener("scroll", updateProgress, { passive: true });
addEventListener("resize", updateProgress);
updateProgress();

const ICONS = {
    computador: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    codigo: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    bola: '<circle cx="12" cy="12" r="9"/><path d="M12 8.5l3 2.2-1.1 3.6h-3.8L9 10.7zM12 8.5V3.2M15 10.7l5-1.7M13.9 14.3l3 4.1M10.1 14.3l-3 4.1M9 10.7L4 9"/>',
    haltere: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
    coracao: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    cruz: '<path d="M12 3v18M7 8h10"/>',
    teia: '<path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1M12 4l5.66 2.34L20 12l-2.34 5.66L12 20l-5.66-2.34L4 12l2.34-5.66zM12 8l2.83 1.17L16 12l-1.17 2.83L12 16l-2.83-1.17L8 12l1.17-2.83z"/>'
};

const names = Object.keys(ICONS);
const total = 14;
const between = (min, max) => min + Math.random() * (max - min);

document.getElementById("floaters").append(
    ...Array.from({ length: total }, (_, i) => {
        const item = document.createElement("span");
        const duration = between(32, 55);
        item.className = "floater";
        item.innerHTML = `<svg viewBox="0 0 24 24">${ICONS[names[i % names.length]]}</svg>`;
        item.style.setProperty("--x", `${((i + between(0.1, 0.8)) / total) * 100}%`);
        item.style.setProperty("--size", `${between(28, 52)}px`);
        item.style.setProperty("--duration", `${duration}s`);
        item.style.setProperty("--delay", `${-between(0, duration)}s`);
        item.style.setProperty("--sway", `${between(-40, 40)}px`);
        item.style.setProperty("--spin", `${between(-40, 40)}deg`);
        return item;
    })
);