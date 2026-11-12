# Apex local backend

This learning version serves the login page and its API from one local Python
server. It uses FastAPI and SQLite. Passwords are hashed before they are stored,
and login sessions use random, HTTP-only cookies.

## Run on Windows

1. Install Python 3.10 or later if it is not already installed.
2. Double-click `start_apex.bat`.
3. Wait until it says Apex is ready; the browser opens after the backend responds.
   You can close the launcher window—the backend keeps running in the background.
4. Double-click `stop_apex.bat` when you are finished.

Do not use VS Code's **Go Live** button for this version: Live Server cannot run
the Python backend. Use `start_apex.bat` instead. It creates a project-specific
`.apex-venv` folder, installs packages from `requirements.txt`, starts the
backend in the background, waits for its health check to succeed, and only then
opens the page. It does not modify an existing `.venv` folder. If Apex is
already running, the launcher opens the existing server instead of starting
another copy.

The local server remains available after you close the launcher, but it stops
when you stop it with `stop_apex.bat` or shut down/restart your computer. Start
Apex again after a restart. This is still a local app on your computer, not an
internet-hosted service.

## What works

- Create an account with a name, email, age, exam goal, and password.
- Choose a specific Maths or Science Olympiad, describe preparation progress,
  add a school class, and update these choices later.
- Use the learning dashboard's Home, Progress, Updates, and Profile tabs.
- View saved account and learning details in the dashboard's Profile tab
  without entering them again each time.
- Log in, optionally keep a local session for up to 30 days, and log out.
- Check the current login at `/api/auth/me`.
- Store account details, Olympiad choice, preparation level, salted PBKDF2
  password hashes, and hashed session tokens in `apex.sqlite3` on this computer.
- Limit repeated sign-up and login attempts in this running server process.

## Real Numbers chapter quiz

Class 10 SOF IMO learners can open a separate 10-question Real Numbers quiz
from the existing chapter page. Each new attempt contains 5 course-concept
questions and 5 Olympiad-reasoning questions. Lesson modules and practice
questions remain separate and unchanged.

The server controls quiz timing, answers, scoring, submission, and rewards.
New attempts have a 20-minute overall limit and a 120-second budget for each
question. A question's unused time is paused while the learner is on another
question and resumes with its remaining time if revisited; navigation or
refreshing cannot restore spent time. An expired question locks, and expiry of
the overall limit submits the attempt automatically. Only one unfinished
attempt is allowed per learner and quiz. Attempts and scores are retained
separately. Each new attempt saves its full question, option, key, and
explanation snapshot so later bank edits do not change that attempt's review.
The additive migration also fills snapshots for original attempts from their
preserved 20-question bank; existing scores, answers, and timestamps remain.
Both timers are ON for new attempts. A future quiz configuration that does not
use one of these timers should mark it explicitly OFF. Attempts created before
the 10-question update retain their original 20-question question set and
40-minute deadline.

After submission, the results page shows the score, accuracy, correct,
incorrect, and unanswered counts, time taken, and an explanation for every
question. Explanations and correct options are not sent by the server while
the attempt is in progress. Accuracy is `correct answers / 20 × 100`; an
unanswered item is counted separately from an incorrect attempted answer.

### Quiz XP reward rule

Each submitted attempt earns `10 + (2 × correct answers)` XP: 10 XP for
completion plus 2 XP per correct answer. For current 10-question attempts the
range is 10–30 XP; earlier 20-question attempts keep the same formula and can
earn up to 50 XP.
The backend
calculates the amount and stores it in `xp_transactions`. The attempt ID is
unique in that table, so submitting the same attempt again cannot grant a
duplicate reward. XP is intentionally not returned to or displayed by the
current quiz interface.

The API documentation is available at `http://127.0.0.1:8000/docs` while the
server is running.

## Polynomials chapter quiz

Class 10 SOF IMO learners can launch a separate 10-question Polynomials quiz
from the chapter page. Each attempt has 5 course questions and 5 Olympiad
reasoning questions. It uses the shared server-controlled 20-minute overall
timer and 120-second per-question timer, saves each question set with its
attempt, and retains submitted attempts separately. Refreshing resumes the
same attempt with remaining time. The quiz page lists the learner's own prior
attempts and opens each saved review. Correct answers and detailed solutions
are available only after submission. Results include correct, incorrect and
unanswered counts, accuracy, time taken and a colored summary graph.

The new quiz reuses the existing `quiz_attempts` and `xp_transactions` tables;
it adds no table or migration. Its server-only question bank and independent
answer review are documented in [POLYNOMIALS_QUIZ_QUALITY.md](POLYNOMIALS_QUIZ_QUALITY.md).

After sign-up or log-in, Maths Olympiad learners can choose SOF IMO or IOQM.
Science Olympiad learners can currently choose SOF NSO. The choice
and preparation level are saved with the account in the local database. Next,
Olympiad learners choose their class (1–12). Their name, email, age, learning
goal, Olympiad, preparation level, and class appear on the local profile page at
`http://127.0.0.1:8000/profile`. Learners can update their Olympiad, preparation
level, and class with the “Edit my learning path” link in the Profile tab. The
Home tab lists the SOF IMO topics and SOF NSO Class 10 topics for matching
profiles; other exam and class topic lists can be added later. The bottom
navigation remains available while switching between Home, Progress, Updates,
and Profile. Selecting “Real Numbers” opens its Class 10 SOF IMO learning
module with guided lessons, number-line visuals, worked examples, and
revealable practice solutions. Revision and Olympiad-extension material is
labelled separately from the Class 10 core. Selecting “Polynomials” opens its
Class 10 SOF IMO chapter with separate lessons, worked examples, graphs, and
revealable practice solutions; prerequisite and Olympiad-extension material
is labelled separately from the Class 10 core. Selecting “Pair of Linear
Equations in Two Variables” opens its Class 10 SOF IMO module with graph-based
lessons, algebraic methods, worked examples, and revealable practice; Olympiad
extensions are labelled separately. Selecting “Quadratic Equations” opens its
Class 10 SOF IMO chapter with visual lessons, accurate parabola diagrams,
worked examples, and original Olympiad practice. Supporting derivations and
root–coefficient extensions are labelled separately from the Class 10 core.
Selecting “Arithmetic Progressions” opens its Class 10 SOF IMO lessons on
sequence patterns, nth terms, sums, arithmetic means, applications, and
Olympiad extensions. Number-line, pairing, and graph visuals accompany
worked examples and revealable original practice questions.

## Export locally registered accounts to Excel

Double-click `export_accounts.bat`. It creates `Apex_Accounts.xlsx` in the
project folder and opens it in Excel (if Excel is installed). To run the export
from the VS Code terminal instead:

```powershell
.\.apex-venv\Scripts\python.exe export_accounts.py
```

The spreadsheet has filterable columns for name, email, age, class, learning
goal, Olympiad, and preparation level. It reads `apex.sqlite3` in read-only mode
and never exports password hashes or session tokens. Keep the spreadsheet
private. Re-run the exporter whenever you want an updated copy.

## Testing

From a terminal in this folder, install the test dependency and run:

```powershell
py -3 -m venv .apex-venv
.\.apex-venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.\.apex-venv\Scripts\python.exe -m unittest
```

## Important safety limits

This is a local learning backend, not a Play Store-ready account service. It
binds only to this computer and saves data in a local SQLite file. Do not enter
real or reused passwords or real student information. There is no email
verification, password recovery, parental-consent workflow, cloud backup, or
deployed database. Before any public launch, the app needs a proper production
hosting setup, HTTPS, secure cookie configuration, privacy and child-safety
review, account recovery, and stronger production monitoring and abuse
protection. The local rate limit resets when the server restarts and is not a
replacement for a production rate limiter.

## Project file map

The app files stay together in this folder because the server and launchers
expect these paths. VS Code groups the related files underneath their launchers
or main files to make the Explorer easier to navigate.

| Purpose | Files |
| --- | --- |
| Login page | `login_page.html`, `login_page.js` |
| Olympiad selection page | `onboarding.html`, `onboarding.js` |
| Learning dashboard and profile tabs | `dashboard.html`, `dashboard.js` |
| Real Numbers learning module | `real_numbers.html`, `real_numbers.js`, `real_numbers_content.js` |
| Real Numbers quiz interface | `real_numbers_quiz.html`, `real_numbers_quiz.css`, `real_numbers_quiz.js` |
| Real Numbers quiz question banks and API | `real_numbers_quiz_v2.py`, legacy `real_numbers_quiz.py`, `backend.py` |
| Quiz tests and question-quality reports | `test_real_numbers_quiz.py`, `REAL_NUMBERS_QUIZ_V2_QUALITY.md`, legacy `REAL_NUMBERS_QUIZ_QUALITY.md` |
| Pair of Linear Equations learning module | `linear_equations.html`, `linear_equations.js`, `linear_equations_content.js` |
| Quadratic Equations learning module | `quadratic_equations.html`, `quadratic_equations.js`, `quadratic_equations_content.js` |
| Arithmetic Progressions learning module | `arithmetic_progressions.html`, `arithmetic_progressions.js`, `arithmetic_progressions_content.js` |
| Python backend and its tests | `backend.py`, `test_backend.py` |
| Start and stop the app | `start_apex.bat`, `start_apex.py`, `stop_apex.bat`, `stop_apex.ps1` |
| Export accounts to Excel | `export_accounts.bat`, `export_accounts.py` |
| Python dependencies | `requirements.txt`, `requirements-dev.txt` |
| Local account data and spreadsheet | `apex.sqlite3`, `Apex_Accounts.xlsx` |
| Optional terminal account viewer | `view_accounts.py` |
| VS Code project settings | `.vscode/settings.json` |

Generated environments, Python cache files, and temporary server status files
are hidden in the VS Code Explorer; they are not deleted.
