function WebSocketTest() {
  if ("WebSocket" in window) {
    var ws = new WebSocket("ws://localhost:30000");

    ws.onmessage = function (evt) {
      console.info(evt);
      window.location.reload();
    };

    ws.onclose = function (e) {
      console.error("Socket is closed. Retrying in 5 seconds.", e.reason);
      setTimeout(function () {
        WebSocketTest();
      }, 5000);
    };
  } else console.error("Cannot open WebSocket");
}

WebSocketTest();
