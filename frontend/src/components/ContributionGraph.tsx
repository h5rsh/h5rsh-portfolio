import { useEffect, useState, useMemo } from "react";
import { useTheme } from "./ThemeProvider";

const GITHUB_USERNAME = "h5rsh";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

// Dark mode: GitHub's dark default theme colors (grayscale like reference)
const DARK_LEVEL_COLORS = [
  "#2d333b", // level 0 - empty
  "#4a5058", // level 1 - low
  "#6e7681", // level 2 - medium
  "#adbac7", // level 3 - high
  "#e6edf3", // level 4 - max (near white)
];

// Light mode: GitHub's classic green palette
const LIGHT_LEVEL_COLORS = [
  "#ebedf0", // level 0
  "#9be9a8", // level 1
  "#40c463", // level 2
  "#30a14e", // level 3
  "#216e39", // level 4
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ContributionGraph = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (res.ok) {
          const json: ContributionData = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch contribution data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  const { weeks, monthLabels, totalContributions } = useMemo(() => {
    if (!data) return { weeks: [], monthLabels: [], totalContributions: 0 };

    const today = new Date();
    // Filter to only past dates (up to today)
    const contributions = data.contributions
      .filter((c) => new Date(c.date) <= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (contributions.length === 0) {
      return { weeks: [], monthLabels: [], totalContributions: 0 };
    }

    // Build weeks grid (7 rows x N columns)
    const weeksArr: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Pad start of first week with nulls
    const firstDayOfWeek = new Date(contributions[0].date).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    }

    // Pad end of last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    // Build month labels with positions
    const labels: { label: string; x: number }[] = [];
    let lastMonth = -1;
    for (let col = 0; col < weeksArr.length; col++) {
      const firstDay = weeksArr[col].find((d) => d !== null);
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ label: MONTHS[month], x: col });
          lastMonth = month;
        }
      }
    }

    const total = contributions.reduce((sum, c) => sum + c.count, 0);

    return { weeks: weeksArr, monthLabels: labels, totalContributions: total };
  }, [data]);

  const levelColors = theme === "dark" ? DARK_LEVEL_COLORS : LIGHT_LEVEL_COLORS;

  const cellSize = 11;
  const cellGap = 3;
  const step = cellSize + cellGap;
  const dayLabelWidth = 30;
  const headerHeight = 20;
  const footerHeight = 24;
  const svgWidth = dayLabelWidth + weeks.length * step + 8;
  const svgHeight = headerHeight + 7 * step + footerHeight;

  if (loading) {
    return (
      <div className="rounded-xl p-4 overflow-hidden">
        <p className="text-xs font-mono text-muted-foreground mb-3 italic">Contribution Graph</p>
        <div className="h-[140px] animate-pulse rounded-lg" style={{ backgroundColor: theme === "dark" ? "#161b22" : "#f0f0f0" }} />
      </div>
    );
  }

  if (!data || weeks.length === 0) return null;

  return (
    <div className="rounded-xl p-4 sm:p-5 overflow-hidden">
      <p className="text-xs font-mono text-muted-foreground mb-3 italic">Contribution Graph</p>
      <div>
        <svg
          width="100%"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Month labels */}
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={dayLabelWidth + m.x * step}
              y={12}
              fill={theme === "dark" ? "#8b949e" : "#57606a"}
              fontSize={10}
              fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels (Mon, Wed, Fri) */}
          {[1, 3, 5].map((dayIdx) => (
            <text
              key={dayIdx}
              x={0}
              y={headerHeight + dayIdx * step + cellSize - 2}
              fill={theme === "dark" ? "#8b949e" : "#57606a"}
              fontSize={9}
              fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
            >
              {DAYS[dayIdx]}
            </text>
          ))}

          {/* Contribution cells */}
          {weeks.map((week, col) =>
            week.map((day, row) => {
              if (!day) return null;

              return (
                <rect
                  key={day.date}
                  x={dayLabelWidth + col * step}
                  y={headerHeight + row * step}
                  width={cellSize}
                  height={cellSize}
                  rx={2}
                  ry={2}
                  fill={levelColors[day.level] || levelColors[0]}
                >
                  <title>{`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}</title>
                </rect>
              );
            })
          )}

          {/* Footer: total + legend */}
          <text
            x={dayLabelWidth}
            y={svgHeight - 4}
            fill={theme === "dark" ? "#8b949e" : "#57606a"}
            fontSize={10}
            fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
          >
            {totalContributions} contributions in the last year
          </text>

          {/* Legend */}
          <text
            x={svgWidth - 125}
            y={svgHeight - 4}
            fill={theme === "dark" ? "#8b949e" : "#57606a"}
            fontSize={10}
            fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
          >
            Less
          </text>
          {levelColors.map((color, i) => (
            <rect
              key={i}
              x={svgWidth - 95 + i * (cellSize + 2)}
              y={svgHeight - 14}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill={color}
            />
          ))}
          <text
            x={svgWidth - 95 + 5 * (cellSize + 2)}
            y={svgHeight - 4}
            fill={theme === "dark" ? "#8b949e" : "#57606a"}
            fontSize={10}
            fontFamily="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace"
          >
            More
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ContributionGraph;
