# ─────────────────────────────────────────────────────────
# DAVIData — Git Hook Kurulum Scripti (Windows PowerShell)
# Çalıştır: .\hooks\install-hooks.ps1
# ─────────────────────────────────────────────────────────

$RED    = "`e[31m"
$GREEN  = "`e[32m"
$YELLOW = "`e[33m"
$NC     = "`e[0m"

Write-Host ""
Write-Host "DAVIData Git Hook Kurulumu" -ForegroundColor Cyan
Write-Host "──────────────────────────────────────" -ForegroundColor DarkGray

# .git klasörü var mı?
if (-not (Test-Path ".git")) {
    Write-Host "HATA: Bu scripti projenin kök dizininde çalıştır." -ForegroundColor Red
    exit 1
}

$hooksDir    = ".git\hooks"
$sourceDir   = "hooks"
$hookFiles   = @("pre-commit", "pre-push", "commit-msg")

foreach ($hook in $hookFiles) {
    $src  = Join-Path $sourceDir $hook
    $dest = Join-Path $hooksDir $hook

    if (-not (Test-Path $src)) {
        Write-Host "  ATLA: $hook (kaynak bulunamadı)" -ForegroundColor Yellow
        continue
    }

    Copy-Item -Path $src -Destination $dest -Force

    # Git Bash için Unix satır sonuna çevir
    $content = Get-Content $dest -Raw
    $content = $content -replace "`r`n", "`n"
    [System.IO.File]::WriteAllText((Resolve-Path $dest), $content)

    Write-Host "  OK: $hook kuruldu" -ForegroundColor Green
}

Write-Host "──────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Tum hooklar basariyla kuruldu!" -ForegroundColor Green
Write-Host ""
Write-Host "Aktif hooklar:" -ForegroundColor White
Write-Host "  pre-commit  → TypeScript + ESLint + hassas veri kontrolu" -ForegroundColor DarkGray
Write-Host "  pre-push    → Full build + calisma agaci kontrolu" -ForegroundColor DarkGray
Write-Host "  commit-msg  → Conventional Commits format kontrolu" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Commit mesaj formati: feat|fix|docs|refactor|chore: aciklama" -ForegroundColor Yellow
Write-Host "Ornek: feat: yatirim tablosuna filtre eklendi" -ForegroundColor DarkGray
Write-Host ""
