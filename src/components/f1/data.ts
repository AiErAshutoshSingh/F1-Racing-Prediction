// Static F1-style data used across the app. Not real-time; representative.

export const DRIVERS = [
  { code: "VER", name: "Max Verstappen", team: "Red Bull", nat: "🇳🇱 NED", wins: 63, poles: 42, podiums: 112, champs: 4, avgFinish: 2.1, avgGrid: 2.3, bestLap: "1:05.910", score: 97 },
  { code: "NOR", name: "Lando Norris", team: "McLaren", nat: "🇬🇧 GBR", wins: 12, poles: 8, podiums: 34, champs: 0, avgFinish: 4.1, avgGrid: 3.8, bestLap: "1:06.211", score: 91 },
  { code: "LEC", name: "Charles Leclerc", team: "Ferrari", nat: "🇲🇨 MON", wins: 9, poles: 26, podiums: 41, champs: 0, avgFinish: 4.6, avgGrid: 3.1, bestLap: "1:06.084", score: 90 },
  { code: "HAM", name: "Lewis Hamilton", team: "Ferrari", nat: "🇬🇧 GBR", wins: 105, poles: 104, podiums: 202, champs: 7, avgFinish: 3.4, avgGrid: 3.6, bestLap: "1:06.412", score: 94 },
  { code: "PIA", name: "Oscar Piastri", team: "McLaren", nat: "🇦🇺 AUS", wins: 8, poles: 5, podiums: 22, champs: 0, avgFinish: 5.2, avgGrid: 4.6, bestLap: "1:06.331", score: 88 },
  { code: "RUS", name: "George Russell", team: "Mercedes", nat: "🇬🇧 GBR", wins: 4, poles: 3, podiums: 19, champs: 0, avgFinish: 5.7, avgGrid: 5.1, bestLap: "1:06.522", score: 84 },
  { code: "SAI", name: "Carlos Sainz", team: "Williams", nat: "🇪🇸 ESP", wins: 3, poles: 6, podiums: 27, champs: 0, avgFinish: 6.9, avgGrid: 6.4, bestLap: "1:06.741", score: 80 },
  { code: "ALO", name: "Fernando Alonso", team: "Aston Martin", nat: "🇪🇸 ESP", wins: 32, poles: 22, podiums: 106, champs: 2, avgFinish: 8.1, avgGrid: 8.9, bestLap: "1:07.010", score: 82 },
  { code: "GAS", name: "Pierre Gasly", team: "Alpine", nat: "🇫🇷 FRA", wins: 1, poles: 0, podiums: 5, champs: 0, avgFinish: 10.4, avgGrid: 11.2, bestLap: "1:07.402", score: 71 },
  { code: "TSU", name: "Yuki Tsunoda", team: "RB", nat: "🇯🇵 JPN", wins: 0, poles: 0, podiums: 0, champs: 0, avgFinish: 12.8, avgGrid: 13.4, bestLap: "1:07.612", score: 65 },
];

export const CONSTRUCTORS = [
  { name: "McLaren", color: "#FF8000", pts: 612, wins: 12, podiums: 28, pole: 9, avgFinish: 3.9, winRate: 42, reliability: 96, pitAvg: 2.31 },
  { name: "Red Bull", color: "#3671C6", pts: 594, wins: 11, podiums: 24, pole: 14, avgFinish: 4.2, winRate: 39, reliability: 94, pitAvg: 2.19 },
  { name: "Ferrari", color: "#E80020", pts: 541, wins: 6, podiums: 22, pole: 8, avgFinish: 4.8, winRate: 21, reliability: 91, pitAvg: 2.42 },
  { name: "Mercedes", color: "#27F4D2", pts: 402, wins: 2, podiums: 14, pole: 3, avgFinish: 5.8, winRate: 9, reliability: 97, pitAvg: 2.28 },
  { name: "Aston Martin", color: "#229971", pts: 168, wins: 0, podiums: 2, pole: 0, avgFinish: 8.4, winRate: 0, reliability: 89, pitAvg: 2.55 },
  { name: "Alpine", color: "#0093CC", pts: 88, wins: 0, podiums: 0, pole: 0, avgFinish: 11.1, winRate: 0, reliability: 85, pitAvg: 2.61 },
  { name: "Williams", color: "#64C4FF", pts: 74, wins: 0, podiums: 1, pole: 0, avgFinish: 11.8, winRate: 0, reliability: 86, pitAvg: 2.58 },
  { name: "RB", color: "#6692FF", pts: 62, wins: 0, podiums: 0, pole: 0, avgFinish: 12.4, winRate: 0, reliability: 84, pitAvg: 2.64 },
  { name: "Kick Sauber", color: "#52E252", pts: 24, wins: 0, podiums: 0, pole: 0, avgFinish: 14.2, winRate: 0, reliability: 82, pitAvg: 2.71 },
  { name: "Haas", color: "#B6BABD", pts: 41, wins: 0, podiums: 0, pole: 0, avgFinish: 13.1, winRate: 0, reliability: 88, pitAvg: 2.66 },
];

export const CIRCUITS = [
  { name: "Monaco", country: "🇲🇨 Monaco", length: 3.337, corners: 19, lapRecord: "1:12.909", winner: "Verstappen" },
  { name: "Silverstone", country: "🇬🇧 UK", length: 5.891, corners: 18, lapRecord: "1:27.097", winner: "Hamilton" },
  { name: "Suzuka", country: "🇯🇵 Japan", length: 5.807, corners: 18, lapRecord: "1:30.983", winner: "Verstappen" },
  { name: "Spa", country: "🇧🇪 Belgium", length: 7.004, corners: 20, lapRecord: "1:46.286", winner: "Hamilton" },
  { name: "Monza", country: "🇮🇹 Italy", length: 5.793, corners: 11, lapRecord: "1:21.046", winner: "Leclerc" },
  { name: "Interlagos", country: "🇧🇷 Brazil", length: 4.309, corners: 15, lapRecord: "1:10.540", winner: "Bottas" },
  { name: "COTA", country: "🇺🇸 USA", length: 5.513, corners: 20, lapRecord: "1:36.169", winner: "Verstappen" },
  { name: "Marina Bay", country: "🇸🇬 Singapore", length: 4.940, corners: 19, lapRecord: "1:35.867", winner: "Norris" },
  { name: "Yas Marina", country: "🇦🇪 UAE", length: 5.281, corners: 16, lapRecord: "1:26.103", winner: "Verstappen" },
];

// Winner probability distribution (predictions)
export const WINNER_PROBS = [
  { driver: "VER", team: "Red Bull", prob: 0.32 },
  { driver: "NOR", team: "McLaren", prob: 0.24 },
  { driver: "LEC", team: "Ferrari", prob: 0.14 },
  { driver: "PIA", team: "McLaren", prob: 0.11 },
  { driver: "HAM", team: "Ferrari", prob: 0.08 },
  { driver: "RUS", team: "Mercedes", prob: 0.05 },
  { driver: "SAI", team: "Williams", prob: 0.03 },
  { driver: "ALO", team: "Aston", prob: 0.02 },
  { driver: "Field", team: "Other", prob: 0.01 },
];

export const LAP_DELTAS = Array.from({ length: 58 }, (_, i) => ({
  lap: i + 1,
  VER: 90 + Math.sin(i / 3) * 0.6 + (i > 20 ? 0.15 : 0),
  NOR: 90.3 + Math.cos(i / 4) * 0.5,
  LEC: 90.6 + Math.sin(i / 5) * 0.7,
  HAM: 90.9 + Math.cos(i / 6) * 0.6,
}));

export const FEATURE_IMPORTANCE = [
  { feature: "Qualifying Position", value: 0.28 },
  { feature: "Constructor Form (5R)", value: 0.19 },
  { feature: "Circuit History", value: 0.13 },
  { feature: "Pit Stop Avg", value: 0.09 },
  { feature: "Tyre Deg Index", value: 0.08 },
  { feature: "Weather (rain%)", value: 0.07 },
  { feature: "Driver Form (3R)", value: 0.06 },
  { feature: "Grid Penalty", value: 0.05 },
  { feature: "DRS Zones", value: 0.03 },
  { feature: "Safety Car Base", value: 0.02 },
];

export const MODELS = [
  { name: "XGBoost", acc: 0.95, prec: 0.93, rec: 0.91, f1: 0.92, latency: 21 },
  { name: "LightGBM", acc: 0.94, prec: 0.92, rec: 0.90, f1: 0.91, latency: 18 },
  { name: "CatBoost", acc: 0.93, prec: 0.91, rec: 0.90, f1: 0.90, latency: 27 },
  { name: "Random Forest", acc: 0.89, prec: 0.88, rec: 0.85, f1: 0.86, latency: 34 },
];

export const SEASONS_TREND = Array.from({ length: 15 }, (_, i) => {
  const year = 2010 + i;
  return {
    year,
    Mercedes: 300 + Math.sin(i / 2) * 120 + (i >= 4 && i <= 10 ? 260 : 0),
    RedBull: 200 + Math.cos(i / 2.3) * 100 + (i >= 0 && i <= 3 ? 250 : 0) + (i >= 11 ? 340 : 0),
    Ferrari: 250 + Math.sin(i / 1.7) * 90,
    McLaren: 120 + Math.cos(i / 3) * 60 + (i >= 13 ? 300 : 0),
  };
});