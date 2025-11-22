import Typewriter from "typewriter-effect";

function TypeWriter({ input }: { input: string[] }) {
  return (
    <Typewriter
      options={{
        strings: input,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default TypeWriter;
