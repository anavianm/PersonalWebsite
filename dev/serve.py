#!/usr/bin/env python3
"""Local preview server: serves the site and forwards /api/ to the MOOP API.

On the real server Apache does both jobs. Locally:
  1. start the API inside WSL (see moop-api/README.md)
  2. python dev/serve.py            -> http://127.0.0.1:8765
"""
import os
import sys
import urllib.error
import urllib.request
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = os.environ.get("MOOP_API", "http://127.0.0.1:8090")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


class Handler(SimpleHTTPRequestHandler):
    def _proxy(self):
        body = None
        if self.command == "POST":
            body = self.rfile.read(int(self.headers.get("Content-Length") or 0))
        req = urllib.request.Request(API + self.path, data=body, method=self.command,
                                     headers={"Content-Type": self.headers.get("Content-Type", "application/json"),
                                              "X-Forwarded-For": self.client_address[0]})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                status, data, ctype = r.status, r.read(), r.headers.get("Content-Type")
        except urllib.error.HTTPError as e:
            status, data, ctype = e.code, e.read(), e.headers.get("Content-Type")
        except OSError:
            status, data, ctype = 502, b'{"ok": false, "error": "MOOP API is not running"}', "application/json"
        self.send_response(status)
        self.send_header("Content-Type", ctype or "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path.startswith("/api/"):
            return self._proxy()
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/"):
            return self._proxy()
        self.send_error(405)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")  # always show the latest edits
        super().end_headers()


if __name__ == "__main__":
    print(f"site: http://127.0.0.1:{PORT}   api: {API}", flush=True)
    ThreadingHTTPServer(("127.0.0.1", PORT), partial(Handler, directory=ROOT)).serve_forever()
