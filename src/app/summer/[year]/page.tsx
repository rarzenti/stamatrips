

import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function SummerYearPage({ params }: { params: { year: string } }) {
  const year = params.year;
  const dir = path.join(process.cwd(), "content/summer", year);
  let days: { slug: string; title: string; date?: string }[] = [];
  try {
    days = fs.readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const fileContent = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(fileContent);
        return {
          slug,
          title: data.title || slug,
          date: data.date,
        };
      });
  } catch (e) {
    days = [];
  }

  return (
    <main className="max-w-2xl mx-auto p-8 bg-yellow-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-orange-500 drop-shadow">☀️ Summer {year} Days</h1>
      {days.length === 0 ? (
        <div className="text-gray-400">No days found for {year}.</div>
      ) : (
        <div className="grid gap-6">
          {days.map((day, idx) => {
            // Format date with weekday
            let dateStr = "";
            if (day.date) {
              // Parse as local date to avoid UTC offset issues
              const [y, m, d] = day.date.split("-");
              const localDate = new Date(Number(y), Number(m) - 1, Number(d));
              if (!isNaN(localDate.getTime())) {
                dateStr = localDate.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" });
              } else {
                dateStr = day.date;
              }
            }
            return (
              <Link
                key={day.slug}
                href={`/summer/${year}/${day.slug}`}
                className="block bg-white/80 border border-yellow-200 rounded-xl shadow hover:shadow-lg transition p-6 text-left group hover:bg-yellow-100"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-orange-400 group-hover:text-orange-500">
                    Day {idx + 1}
                  </span>
                  {dateStr && (
                    <span className="text-sm text-orange-700 font-semibold">{dateStr}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const yearsDir = path.join(process.cwd(), "content/summer");
  const years = fs.readdirSync(yearsDir).filter((f) => !f.startsWith("."));
  return years.map((year) => ({ year }));
}
