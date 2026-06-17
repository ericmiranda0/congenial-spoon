import pdfplumber
import os

input_dir = "conteudo para criação"
output_dir = "extracted_texts"
os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(input_dir):
    if filename.endswith(".pdf"):
        pdf_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename.replace(".pdf", ".txt"))
        
        print(f"Extracting text from {pdf_path}...")
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                with open(output_path, "w", encoding="utf-8") as f:
                    for i, page in enumerate(pdf.pages):
                        text = page.extract_text()
                        f.write(f"--- PAGE {i+1} ---\n")
                        if text:
                            f.write(text)
                        f.write("\n\n")
            print(f"Successfully extracted {filename} to {output_path}")
        except Exception as e:
            print(f"Error extracting {filename}: {e}")
