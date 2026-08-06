import sys
import time
from faster_whisper import WhisperModel

# Configurar stdout para UTF-8 no Windows
sys.stdout.reconfigure(encoding='utf-8')

audio_path = r"C:\Users\Usuario\Desktop\Resumos da faculdade\CONTEUDO\CPC AULA 02.m4a"
output_path = r"C:\Users\Usuario\Desktop\Resumos da faculdade\transcricao_cpc_aula_02.txt"

print("Iniciando carregamento do modelo Whisper (tiny)...", flush=True)
start_time = time.time()

model = WhisperModel("tiny", device="cpu", compute_type="int8")

print(f"Modelo carregado em {time.time() - start_time:.2f}s. Transcrevendo audio...", flush=True)
segments, info = model.transcribe(audio_path, language="pt", beam_size=1)

print(f"Duracao do audio: {info.duration/60:.2f} minutos. Escrevendo resultados...", flush=True)

with open(output_path, "w", encoding="utf-8") as f:
    f.write(f"=== TRANSCRIÇÃO CPC AULA 02 ===\n")
    f.write(f"Duração: {info.duration/60:.2f} minutos\n\n")
    f.flush()
    
    count = 0
    for segment in segments:
        line = f"[{segment.start:.1f}s -> {segment.end:.1f}s] {segment.text}"
        f.write(line + "\n")
        f.flush()
        count += 1
        if count % 20 == 0:
            print(f"Processados {segment.end/60:.1f} minutos de audio...", flush=True)

print("\nFINALIZADO COM SUCESSO!", flush=True)
