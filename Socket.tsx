import { useEffect, useState, type FormEvent } from "react";

const url = "http://localhost:8000/file";

const socket = new WebSocket("ws://localhost:8000/ws");

export default function Socket() {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => data);

    console.log(response);
    setStatus(response.status);
  }

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.log("WebSocket connection established! Laravel");
    });

    socket.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      console.log(response.status);
      setStatus(response.status);
    });

    socket.addEventListener("close", () => {
      console.log("Closed");
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit">Submit</button>
      </form>

      <h1>{status}</h1>
    </>
  );
}
