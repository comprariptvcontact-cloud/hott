<?xml version="1.0" encoding="UTF-8"?>
<!--
  Cosmetic only. Without a stylesheet a browser shows "This XML file does not
  appear to have any style information associated with it", which reads like an
  error even though the sitemap is valid. Crawlers ignore this file entirely.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="de">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap — IPTV MATE</title>
        <style>
          :root { color-scheme: light; }
          body { margin:0; background:#f6f7f9; color:#111827;
                 font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif; }
          .wrap { max-width:1100px; margin:0 auto; padding:32px 20px 64px; }
          .brand { display:flex; align-items:baseline; gap:5px; margin-bottom:20px; }
          .brand b { font-family:"Arial Black",Arial,sans-serif; font-size:24px; letter-spacing:-.03em; }
          .brand .g { color:#9ca3af; } .brand .d { color:#0b1220; }
          h1 { font-size:26px; margin:0 0 6px; letter-spacing:-.02em; }
          p.sub { margin:0 0 24px; color:#6b7280; }
          .count { display:inline-block; background:#003580; color:#fff; border-radius:999px;
                   padding:4px 12px; font-weight:700; font-size:12px; }
          table { width:100%; border-collapse:collapse; background:#fff; border:1px solid #e5e7eb;
                  border-radius:12px; overflow:hidden; }
          th { text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:.08em;
               color:#6b7280; background:#fafafa; padding:10px 14px; border-bottom:1px solid #e5e7eb; }
          td { padding:10px 14px; border-bottom:1px solid #f1f2f4; word-break:break-all; }
          tr:last-child td { border-bottom:0; }
          tr:hover td { background:#f9fafb; }
          a { color:#003580; text-decoration:none; } a:hover { text-decoration:underline; }
          td.date { white-space:nowrap; color:#6b7280; font-variant-numeric:tabular-nums; width:1%; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="brand"><b style="color:#facc15">IPTV</b><b class="d">MATE</b></div>
          <xsl:apply-templates/>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="s:sitemapindex">
    <h1>Sitemap-index</h1>
    <p class="sub">
      Dieser Index verweist auf
      <span class="count"><xsl:value-of select="count(s:sitemap)"/> Sitemaps</span>.
      Die einzelnen URLs stehen in den Dateien unten.
    </p>
    <table>
      <tr><th>Sitemap</th><th>Zuletzt geändert</th></tr>
      <xsl:for-each select="s:sitemap">
        <tr>
          <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
          <td class="date"><xsl:value-of select="s:lastmod"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>

  <xsl:template match="s:urlset">
    <h1>Sitemap</h1>
    <p class="sub">
      <span class="count"><xsl:value-of select="count(s:url)"/> URLs</span>
      in dieser Datei. <a href="/sitemap.xml">Zurück zum Index</a>
    </p>
    <table>
      <tr><th>URL</th><th>Zuletzt geändert</th></tr>
      <xsl:for-each select="s:url">
        <tr>
          <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
          <td class="date"><xsl:value-of select="s:lastmod"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </xsl:template>
</xsl:stylesheet>
