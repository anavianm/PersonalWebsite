# MOOP run API

Backs the Terminal window on the site. It compiles visitors' programs with the real
MOOP compiler ([anavianm/Moop](https://github.com/anavianm/Moop), OCaml + LLVM 14) and
runs the generated IR with `lli`. `server.py` uses only the Python standard library.

- `POST /api/moop/run` with `{"source": "...", "mode": "run" | "ast" | "sast" | "ir"}`
- `GET /api/moop/health`

Limits per job: one job at a time, 2 s of CPU, 32 MB heap, 256 MB address space,
64 KB of program output, 10 KB of source, 60 runs per minute per visitor (the Hanoi game makes one run per move).
Nothing is stored. Each job runs in its own folder in RAM under `/dev/shm/moop-jobs`
(the compiler always writes `tests/test.ll` relative to where it runs), deleted as soon
as the job ends; the folder is also wiped when the API starts. Logs record the client,
mode, result and timing, never the source. In the browser, edits are kept only in memory
for the current page visit and there is no save option.

## Build the compiler (Ubuntu 24.04, also WSL)

```bash
apt-get install -y libllvm-14-ocaml-dev llvm-14 llvm-14-dev ocaml ocamlbuild ocaml-findlib git
git clone https://github.com/anavianm/Moop.git && cd Moop
LIBRARY_PATH=/usr/lib/llvm-14/lib ocamlbuild -use-ocamlfind moop.native
```

The repo's `make` targets use `opam exec`, so they don't apply to Ubuntu's packaged
OCaml. The `ocamlbuild` line above is the same build without opam.

## Run locally

In WSL:

```bash
MOOP_BIN=/root/Moop/_build/moop.native MOOP_STDLIB=/root/Moop/stdlib.moop \
  python3 /mnt/c/Users/asimo/OneDrive/Documents/PersonalWebsite/moop-api/server.py
```

In Windows, from the site folder:

```bash
python dev/serve.py
```

Then open http://127.0.0.1:8765/#terminal.

## Settings (environment variables)

`MOOP_BIN`, `MOOP_STDLIB`, `MOOP_WORKDIR` (default `/dev/shm/moop-jobs`), `MOOP_LLI` (default `/usr/bin/lli-14`), `MOOP_HOST`
(default `127.0.0.1`), `MOOP_PORT` (default `8090`), `MOOP_RATE_LIMIT` (default `60`).
