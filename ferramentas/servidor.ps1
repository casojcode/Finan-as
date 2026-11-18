param([string]$Pasta = "pessoal", [int]$Porta = 8080)
# Servidor local simples para testar o Fine no navegador (sem instalar nada).
$raiz = Join-Path (Split-Path -Parent $PSScriptRoot) $Pasta
if (-not (Test-Path $raiz)) { Write-Host "Pasta nao encontrada: $raiz"; Read-Host "Enter para sair"; exit 1 }
$tipos = @{ ".html"="text/html; charset=utf-8"; ".js"="text/javascript"; ".css"="text/css"; ".png"="image/png";
            ".json"="application/json"; ".webmanifest"="application/manifest+json"; ".svg"="image/svg+xml"; ".ico"="image/x-icon" }
$l = New-Object Net.HttpListener
$l.Prefixes.Add("http://localhost:$Porta/")
try { $l.Start() } catch { Write-Host "A porta $Porta ja esta em uso. Feche a outra janela do servidor."; Read-Host "Enter para sair"; exit 1 }
$url = "http://localhost:$Porta/"
Write-Host ""
Write-Host "  Fine ($Pasta) rodando em $url"
Write-Host "  Feche esta janela para parar o servidor."
Write-Host ""
Start-Process $url
while ($l.IsListening) {
  $c = $l.GetContext()
  $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath)
  if ($p.EndsWith("/")) { $p += "index.html" }
  $f = Join-Path $raiz ($p.TrimStart("/") -replace "/", "\")
  $full = [IO.Path]::GetFullPath($f)
  if ($full.StartsWith($raiz) -and (Test-Path $full -PathType Leaf)) {
    $b = [IO.File]::ReadAllBytes($full)
    $t = $tipos[[IO.Path]::GetExtension($full).ToLower()]
    if ($t) { $c.Response.ContentType = $t }
    $c.Response.Headers.Add("Cache-Control", "no-store")
    $c.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}
