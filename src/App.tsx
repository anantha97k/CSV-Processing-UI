import "./App.css";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
} from "./components/ui/item";
import { Button } from "./components/ui/button";
import { DataTableDemo, type File } from "./page";
import { Input } from "./components/ui/input";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { File as CSV } from "buffer";

const url = "http://localhost:8000/file";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const fileRef = useRef(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);
    const csv_file = data["file"] as CSV;

    if (csv_file.size != 0) {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((data) => data.json())
        .then((data) => data);

      const file: File = {
        filename: csv_file.name,
        id: csv_file.name,
        time: new Date(),
        status: response.status,
      };

      console.log(response);
      setFiles([...files, file]);
    }

    if (fileRef.current) fileRef.current.value = "";
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established! Laravel");
    });

    socket.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);
      console.log(response);
      setFiles(
        files.map((file) => {
          if (file.filename == response.filename) {
            return {
              ...file,
              status: response.status,
            };
          } else {
            return file;
          }
        }),
      );
    });

    return () => socket.close(1000);
  }, [files]);

  return (
    <>
      <div className=" grid grid-cols-[1fr_4fr_1fr] h-screen ">
        <div className="col-2  grid grid-rows-[0.5fr_1fr_4fr_1fr] ">
          <div className="row-2">
            <Item variant="muted">
              <ItemContent>
                <ItemDescription>Select file/Drag and drop</ItemDescription>
                <form id="file" onSubmit={handleSubmit}>
                  <Input
                    type="file"
                    name="file"
                    className="max-w "
                    accept=".csv"
                    ref={fileRef}
                  />
                </form>
              </ItemContent>
              <ItemActions className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6 text-base"
                  type="submit"
                  form="file"
                >
                  Upload File
                </Button>
              </ItemActions>
            </Item>
          </div>

          <div className="row-3">
            <DataTableDemo data={files.reverse()} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
