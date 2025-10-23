import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = "force-dynamic"; // Optional: allows dynamic usage on Vercel

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


    const data = await req.json();
    const { content, language } = data;

    // const prompt = `Summarize this blog in ${language || "English"}:\n\n${content}`;
const prompt = `Summarize the following blog in ${language || "English"} using clear, concise bullet points:\n\n${content}`;

    console.log("Sending request to Gemini...");
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const summary = await response.text();

    return Response.json({ summary });
  } catch (err) {
    console.log("Gemini error:", err);

    const statusCode = err?.status || 500;
    const message =
      err?.message || "Something went wrong while generating the summary.";

    return Response.json(
      { error: message },
      { status: statusCode }
    );
  }
}
