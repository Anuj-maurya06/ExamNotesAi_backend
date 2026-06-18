

export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart
}) => {
  return `
You are a STRICT JSON GENERATOR.

You must return ONLY valid JSON.
Do NOT add any explanation, markdown, text, or formatting outside JSON.

⚠️ CRITICAL RULES:
- Output must be valid JSON ONLY
- No markdown (no ###, **, or backticks)
- No extra text before or after JSON
- Use double quotes for all keys and strings
- No trailing commas allowed
- Escape new lines using \\n inside strings
- If you fail, output will break system

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

CONTENT RULES:

1. If Revision Mode is ON:
- Very short notes
- Bullet points only
- No paragraphs
- Exam cheat-sheet style

2. If Revision Mode is OFF:
- Moderate detailed notes
- Simple explanation only
- Max 2–4 lines per point

3. Importance:
Split into:
- ⭐ Very Important
- ⭐⭐ Important
- ⭐⭐⭐ Frequently Asked

4. Diagram:
- If YES → must be valid mermaid graph TD string
- If NO → ""

5. Charts:
- If YES → at least 1 chart
- If NO → []

Allowed chart types: bar, line, pie

---

RETURN EXACTLY THIS JSON STRUCTURE:

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "",
  "notes": "",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart",
    "data": ""
  },
  "charts": []
}

REMEMBER:
Return ONLY JSON. No extra text. No markdown.
`;
};