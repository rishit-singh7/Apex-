$pidFile = Join-Path $PSScriptRoot ".apex-server.pid"
$venvPython = Join-Path $PSScriptRoot ".apex-venv\Scripts\python.exe"
$expectedPython = (& $venvPython -c "import sys; print(sys._base_executable)").Trim()
if ($LASTEXITCODE -ne 0 -or -not $expectedPython) {
    Write-Error "Could not identify Apex's Python executable. No process was stopped."
    exit 1
}
$expectedPython = [System.IO.Path]::GetFullPath($expectedPython)

if (-not (Test-Path -LiteralPath $pidFile)) {
    Write-Output "No Apex-managed server is running."
    exit 0
}

$serverPid = 0
if (-not [int]::TryParse((Get-Content -Raw -LiteralPath $pidFile).Trim(), [ref]$serverPid)) {
    Write-Error "The Apex server PID file is invalid. No process was stopped."
    exit 1
}

$process = Get-CimInstance Win32_Process -Filter "ProcessId = $serverPid"
if ($null -eq $process) {
    Remove-Item -LiteralPath $pidFile
    Write-Output "Apex was already stopped."
    exit 0
}

$runningPython = [System.IO.Path]::GetFullPath($process.ExecutablePath)
$isApexServer = $runningPython.Equals(
    $expectedPython,
    [System.StringComparison]::OrdinalIgnoreCase
) -and $process.CommandLine.Contains("-m uvicorn backend:app")

if (-not $isApexServer) {
    Write-Error "PID $serverPid is not the Apex backend. No process was stopped."
    exit 1
}

Stop-Process -Id $serverPid -ErrorAction Stop
Remove-Item -LiteralPath $pidFile
Write-Output "Apex server stopped."
