import { useState } from "react";
import { type NextPage } from "next";

import { api } from "@/utils/api";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Copy } from "lucide-react";

const Home: NextPage = () => {
  const apiClient = api.useContext().client;
  const [loading, setLoading] = useState<boolean>(false);

  const [regExDescription, setRegExDescription] = useState<string>("");
  const [exampleValid, setExampleValid] = useState<string[]>([]);
  const [exampleInvalid, setExampleInvalid] = useState<string[]>([]);

  const [exampleValidInputValue, setExampleValidInputValue] =
    useState<string>("");
  const [exampleInvalidInputValue, setExampleInvalidInputValue] =
    useState<string>("");

  const [response, setResponse] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await apiClient.ai.createRegEx.mutate({
      description: regExDescription,
      exampleValid,
      exampleInvalid,
    });
    if (response) {
      setResponse(response);
    } else {
      setResponse("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-8">
      <h1 className="text-5xl font-bold text-white md:text-7xl">RegEx AI</h1>

      <form
        onSubmit={
          onSubmit as unknown as (e: React.FormEvent<HTMLFormElement>) => void
        }
        className="flex w-[90%] flex-col gap-y-4 md:w-[70%] lg:w-[50%]"
      >
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="regExDescription">
            What do you need the RegEx for?
          </Label>
          <Input
            id="regExDescription"
            value={regExDescription}
            onChange={(e) => setRegExDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="exampleValid">
            Example of what you need the RegEx to match
          </Label>
          <div className="relative flex flex-wrap items-center gap-y-1 overflow-hidden rounded-md border border-transparent bg-white bg-opacity-30 px-2 py-2 backdrop-blur-md">
            {exampleValid.map((chip, index) => (
              <Chip
                key={index}
                value={chip}
                onDelete={() =>
                  setExampleValid(exampleValid.filter((_, i) => i !== index))
                }
              />
            ))}
            <Input
              id="exampleValid"
              className="max-w-[50%] bg-transparent focus:ring-0 md:max-w-[30%]"
              value={exampleValidInputValue}
              onChange={(e) => setExampleValidInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (exampleValidInputValue === "") return;
                  setExampleValid((prev) => [...prev, exampleValidInputValue]);
                  setExampleValidInputValue("");
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="exampleInvalid">
            Example of what you don&apos;t need the RegEx to match
          </Label>
          <div className="relative flex flex-wrap items-center gap-y-1 overflow-hidden rounded-md border border-transparent bg-white bg-opacity-30 px-2 py-2 backdrop-blur-md">
            {exampleInvalid.map((chip, index) => (
              <Chip
                key={index}
                value={chip}
                onDelete={() =>
                  setExampleInvalid(
                    exampleInvalid.filter((_, i) => i !== index)
                  )
                }
              />
            ))}
            <Input
              id="exampleInvalid"
              className="max-w-[50%] bg-transparent focus:ring-0 md:max-w-[30%]"
              value={exampleInvalidInputValue}
              onChange={(e) => setExampleInvalidInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (exampleInvalidInputValue === "") return;
                  setExampleInvalid((prev) => [
                    ...prev,
                    exampleInvalidInputValue,
                  ]);
                  setExampleInvalidInputValue("");
                }
              }}
            />
          </div>
        </div>

        <Button disabled={loading || regExDescription.length === 0}>
          {loading ? "Loading..." : "Get RegEx"}
        </Button>

        {response && (
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="response">
              Here&apos;s your RegEx, copy it and paste it wherever you need it
            </Label>
            <div className="relative flex flex-row items-center gap-x-2 overflow-hidden rounded-md border border-transparent bg-white bg-opacity-30 px-2 py-2 backdrop-blur-md">
              <Input id="response" value={response} disabled />
              <Copy
                onClick={() => {
                  navigator.clipboard?.writeText(response).catch((e) => {
                    console.error(e);
                  });
                }}
                className="cursor-pointer text-white transition-all ease-in-out active:scale-95"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Home;
