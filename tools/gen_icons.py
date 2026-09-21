"""Gera os icones do PWA a partir de codigo (nenhum asset binario versionado a mao).

Identidade: pizza de fracao 3/4, tons de azul e verde sobre fundo branco.
Rode com: python tools/gen_icons.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "public" / "icons"
SS = 4  # supersampling para bordas suaves

WHITE = (255, 255, 255, 255)
SLICES = [
    (36, 123, 160, 255),   # azul profundo
    (72, 191, 227, 255),   # azul claro
    (26, 147, 111, 255),   # verde
]
EMPTY = (226, 240, 242, 255)  # fatia "vazia" (o quarto que falta)
STROKE = (255, 255, 255, 255)


def draw_pie(size: int, art_ratio: float, background: tuple | None) -> Image.Image:
    """Desenha a pizza centralizada ocupando `art_ratio` do canvas quadrado."""
    canvas = size * SS
    img = Image.new("RGBA", (canvas, canvas), background or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    art = canvas * art_ratio
    pad = (canvas - art) / 2
    box = (pad, pad, pad + art, pad + art)

    # 4 quadrantes: 3 preenchidos (3/4) + 1 vazio, comecando no topo
    for i in range(4):
        start = -90 + i * 90
        fill = EMPTY if i == 3 else SLICES[i]
        d.pieslice(box, start, start + 90, fill=fill, outline=STROKE, width=max(2, int(art * 0.02)))

    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # purpose: 'any' — arte cheia, fundo transparente
    draw_pie(192, 0.94, None).save(OUT / "icon-192.png")
    draw_pie(512, 0.94, None).save(OUT / "icon-512.png")

    # purpose: 'maskable' — arte em ~80% do canvas, fundo opaco (mascara do Android corta bordas)
    draw_pie(512, 0.78, WHITE).save(OUT / "icon-512-maskable.png")

    # iOS nao usa maskable: precisa de fundo opaco proprio
    draw_pie(180, 0.86, WHITE).save(OUT / "apple-touch-icon.png")

    draw_pie(32, 1.0, None).save(OUT / "favicon-32.png")

    print(f"icones gerados em {OUT}")


if __name__ == "__main__":
    main()
