from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

INPUT_FILE = Path("PROJECT_DOCUMENTATION.md")
OUTPUT_FILE = Path("PROJECT_DOCUMENTATION_A4.pdf")


def strip_markdown(text: str) -> str:
    """Convert Markdown-like documentation into plain text for PDF rendering."""
    cleaned_lines = []
    for line in text.splitlines():
        s = line.rstrip()
        if not s:
            cleaned_lines.append("")
            continue

        # Remove heading markers
        if s.startswith("# "):
            s = s[2:]
        elif s.startswith("## "):
            s = s[3:]
        elif s.startswith("### "):
            s = s[4:]
        elif s.startswith("#### "):
            s = s[5:]

        # Convert bullet lists
        if s.startswith("- "):
            s = "• " + s[2:]
        elif s.startswith("* "):
            s = "• " + s[2:]

        # Skip code fences and tables
        if s.startswith("```"):
            continue
        if s.startswith("|"):
            continue

        cleaned_lines.append(s)
    return "\n".join(cleaned_lines)


def build_pdf():
    if not INPUT_FILE.exists():
        raise FileNotFoundError(f"Required input file not found: {INPUT_FILE}")

    markdown_text = INPUT_FILE.read_text(encoding="utf-8")
    plain_text = strip_markdown(markdown_text)

    doc = SimpleDocTemplate(
        str(OUTPUT_FILE),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        name="TitleStyle",
        parent=styles["Title"],
        fontSize=20,
        leading=24,
        alignment=1,
        spaceAfter=12,
    )
    heading_style = ParagraphStyle(
        name="HeadingStyle",
        parent=styles["Heading2"],
        fontSize=13,
        leading=16,
        spaceBefore=12,
        spaceAfter=6,
    )
    body_style = ParagraphStyle(
        name="BodyStyle",
        parent=styles["BodyText"],
        fontSize=10,
        leading=14,
        spaceAfter=4,
    )

    story = []
    story.append(Paragraph("Notes Sharing Platform", title_style))
    story.append(Spacer(1, 8))

    for paragraph in plain_text.split("\n\n"):
        if not paragraph.strip():
            continue
        if paragraph.strip().lower().startswith(("abstract", "introduction", "problem", "objective", "scope", "proposed", "system", "implementation", "user", "challenge", "future", "reference", "repository", "conclusion", "appendix")):
            story.append(Paragraph(paragraph.strip(), heading_style))
        else:
            story.append(Paragraph(paragraph.strip().replace("\n", "<br />"), body_style))

    doc.build(story)
    print(f"PDF created successfully: {OUTPUT_FILE.resolve()}")


if __name__ == "__main__":
    build_pdf()
