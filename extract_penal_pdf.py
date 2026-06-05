import pdfplumber
import os

pdf_path = os.path.join("conteudo para criação", "material completo penal II-106-205.pdf")
output_path = "conteudo_completo_penal_ii.txt"

print(f"Extracting text from {pdf_path}...")

with pdfplumber.open(pdf_path) as pdf:
    with open(output_path, "w", encoding="utf-8") as f:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            f.write(f"--- PAGE {i+1} ---\n")
            if text:
                f.write(text)
            f.write("\n\n")

print(f"Text successfully extracted to {output_path}")
