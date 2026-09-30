# assets/images/

## Miniaturas de video (ya descargadas de los CDN oficiales)

| Archivo | Uso |
|---------|-----|
| `video-vivaldi.jpg` | Miniatura del video del héroe (TikTok · Vivaldi) |
| `video-duo-violines.jpg` | Miniatura del reel del showreel (Instagram · Dúo de violines) |
| `video-nostalgia-tango.jpg` | Miniatura del video del showreel (TikTok · Nostalgia Tango) |

Son las portadas que se ven antes de hacer clic en ▶ (sistema click-to-load).
Si se cambia un video: pedir `https://www.tiktok.com/oembed?url=<url-del-video>`,
tomar `thumbnail_url` y descargarla con `curl.exe -o <nombre>.jpg "<thumbnail_url>"`.

## Fotos reales (pendientes)

Por ahora las cards de servicios usan íconos + gradientes CSS. Cuando haya fotos:

| Archivo sugerido | Uso | Recomendación |
|------------------|-----|---------------|
| `hero.jpg` | Retrato de Enmanuel tocando | Vertical, buena luz, fondo simple |
| `boda.jpg` | Card de Bodas | Enmanuel tocando en un evento (o retrato elegante) |
| `serenata.jpg` | Card de Serenatas | Momento íntimo con el violín |
| `fiesta.jpg` | Card de Fiestas | Enmanuel en vivo, ambiente de fiesta |
| `corporativo.jpg` | Card de Corporativos | Presentación formal/escenario |
| `og-cover.jpg` | Portada para redes (Open Graph) | 1200×630 px |

### Cómo reemplazar los íconos por fotos

En `index.html`, cada card de servicio tiene un bloque así:

```html
<div class="service-media service-media--boda">
  <i class="fa-solid fa-ring" aria-hidden="true"></i>
</div>
```

Se reemplaza por:

```html
<img class="service-media" src="assets/images/boda.jpg" alt="Enmanuel tocando en una boda" loading="lazy">
```

Y en `style.css` añadir:

```css
img.service-media {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
```

> Las fotos de las cards NO deberían pesar más de ~200 KB cada una
> (exportar a JPG calidad ~80 o WebP).
