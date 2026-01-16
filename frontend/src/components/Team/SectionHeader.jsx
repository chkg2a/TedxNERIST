export const SectionHeader = ({ title, subtitle, subtitle2 }) => {
  return (
    <header className="mb-10 text-white">
      <h1
        className="mb-2 text-5xl font-semibold max-sm:text-4xl"
        style={{ fontFamily: "Cirka", fontSize: "5.698rem", fontWeight: "700" }}
      >
        {title}
      </h1>
      <p
        className="text-3xl text-zinc-500 max-sm:text-lg"
        style={{
          fontFamily: "Gilroy-Regular",
          fontWeight: "100!",
          color: "#EBEBEB",
        }}
      >
        {subtitle}
        <br />
        {subtitle2}
      </p>
    </header>
  );
};
