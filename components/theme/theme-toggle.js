import { useTheme } from "@/lib/context/theme-context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
  );
}

/*


*/
