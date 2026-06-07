from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import functools

ROOT = Path(r"C:\Users\harri\OneDrive\Desktop\ChatGPTFriend\Be Present Patch Website")


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".png": "image/png",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    handler = functools.partial(Handler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 8130), handler)
    print("Serving Be Present Patch Website at http://127.0.0.1:8130/index.html")
    server.serve_forever()
