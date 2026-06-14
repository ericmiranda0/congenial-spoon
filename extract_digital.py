import pdfplumber
import os

pdf_path = os.path.join("conteudo para criação", "Questões_Comerciais_e_Economia_de_Dados 06.pdf")
output_path = "questoes_comerciais.txt"

print(f"Extracting text from {pdf_path}...")

if not os.path.exists(pdf_path):
    print(f"Error: {pdf_path} does not exist!")
    exit(1)

with pdfplumber.open(pdf_path) as pdf:
    with open(output_path, "w", encoding="utf-8") as f:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            f.write(f"--- PAGE {i+1} ---\n")
            if text:
                f.write(text)
            f.write("\n\n")

print(f"Text successfully extracted to {output_path}")
