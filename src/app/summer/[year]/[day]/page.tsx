import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function SummerDayPage({ params }: { params: { year: string; day: string } }) {
  const { year, day } = params;
  const filePath = path.join(process.cwd(), "content/summer", year, `${day}.md`);
  let contentHtml = "";
  let data: any = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const matterResult = matter(fileContent);
    data = matterResult.data;
    const processedContent = await remark().use(html).process(matterResult.content);
    contentHtml = processedContent.toString();
  } catch (e) {
    contentHtml = "<p class='text-red-500'>Day not found.</p>";
  }

  return (
    <main className="max-w-2xl mx-auto p-8 bg-yellow-50 rounded-xl shadow-lg prose">
      <h1 className="text-4xl font-extrabold mb-2 text-orange-500 drop-shadow">☀️ {data.title || `${day}`}</h1>
      {data.date && (
        <p className="text-base text-orange-700 mb-6 font-semibold">{data.date}{data.location ? ` — ${data.location}` : ""}</p>
      )}
      {data.coverImage && (
        <img src={data.coverImage} alt={data.title} className="rounded-lg mb-6 shadow-md" />
      )}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}

