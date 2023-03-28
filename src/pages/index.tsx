import { useState } from "react";
import { type NextPage } from "next";

import { api } from "@/utils/api";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await apiClient.ai.createRegEx.mutate({
      description: regExDescription,
      exampleValid,
      exampleInvalid,
    });
    console.log(response);

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
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
      </form>
    </div>
  );
};

export default Home;
