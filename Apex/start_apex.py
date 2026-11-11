import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
import webbrowser
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parent
PYTHON_PATH = PROJECT_DIR / ".apex-venv" / "Scripts" / "python.exe"
PYTHON_BASE_PATH = Path(sys._base_executable)
SITE_PACKAGES_PATH = PROJECT_DIR / ".apex-venv" / "Lib" / "site-packages"
PID_PATH = PROJECT_DIR / ".apex-server.pid"
LOG_PATH = PROJECT_DIR / ".apex-server.log"
APP_URL = "http://127.0.0.1:8000/"
HEALTH_URL = f"{APP_URL}api/health"
STARTUP_TIMEOUT_SECONDS = 30


def backend_is_ready() -> bool:
    try:
        with urllib.request.urlopen(HEALTH_URL, timeout=2) as response:
            return (
                response.status == 200
                and json.load(response).get("status") == "ok"
            )
    except (OSError, urllib.error.URLError, json.JSONDecodeError):
        return False


def start_backend() -> subprocess.Popen[bytes]:
    creation_flags = 0
    process_options: dict[str, object] = {}
    server_python = PYTHON_PATH
    environment = os.environ.copy()
    if os.name == "nt":
        creation_flags = subprocess.DETACHED_PROCESS
        server_python = PYTHON_BASE_PATH
        current_python_path = environment.get("PYTHONPATH")
        environment["PYTHONPATH"] = (
            f"{SITE_PACKAGES_PATH}{os.pathsep}{current_python_path}"
            if current_python_path
            else str(SITE_PACKAGES_PATH)
        )
        environment["PYTHONNOUSERSITE"] = "1"
    else:
        process_options["start_new_session"] = True

    log_file = LOG_PATH.open("ab")
    try:
        process = subprocess.Popen(
            [
                str(server_python),
                "-m",
                "uvicorn",
                "backend:app",
                "--host",
                "127.0.0.1",
                "--port",
                "8000",
            ],
            cwd=PROJECT_DIR,
            stdin=subprocess.DEVNULL,
            stdout=log_file,
            stderr=subprocess.STDOUT,
            creationflags=creation_flags,
            env=environment,
            **process_options,
        )
    finally:
        log_file.close()

    PID_PATH.write_text(f"{process.pid}\n", encoding="ascii")
    return process


def recent_server_log() -> str:
    if not LOG_PATH.is_file():
        return ""
    return "\n".join(LOG_PATH.read_text(encoding="utf-8", errors="replace").splitlines()[-12:])


def main() -> int:
    if backend_is_ready():
        print("Apex is already running.")
        webbrowser.open(APP_URL)
        return 0

    if not PYTHON_PATH.is_file():
        print("Apex's Python environment is missing.")
        print("Run start_apex.bat again to create it and install the required packages.")
        return 1

    print("Starting the Apex backend in the background...")
    process = start_backend()
    deadline = time.monotonic() + STARTUP_TIMEOUT_SECONDS

    while time.monotonic() < deadline:
        if backend_is_ready():
            print("Apex is ready. You can close this launcher; the server will keep running.")
            print("Use stop_apex.bat when you want to stop the server.")
            webbrowser.open(APP_URL)
            return 0

        if process.poll() is not None:
            break
        time.sleep(0.5)

    print("Apex could not start. Check whether another program is using port 8000.")
    log = recent_server_log()
    if log:
        print("\nRecent backend log:")
        print(log)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
