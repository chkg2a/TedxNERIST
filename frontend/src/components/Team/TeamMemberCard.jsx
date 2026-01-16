export const TeamMemberCard = ({ name, role, image }) => {
  return (
    <article className="flex flex-col items-center text-center">
      <img
        src={image}
        alt={`${name}'s profile`}
        className="mb-5 rounded-full object-cover h-[163px] w-[163px] max-sm:h-[120px] max-sm:w-[120px]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "https://source.unsplash.com/random/200x200?portrait";
        }}
      />
      <h2
        className="mb-2 text-2xl font-semibold text-[#ececec]"
        style={{ fontFamily: "Cirka", fontWeight: "700" }}
      >
        {name}
      </h2>
      <p
        className="text-l opacity-70 text-white"
        style={{ fontFamily: "Gilroy-Regular", fontWeight: "100" }}
      >
        {role}
      </p>
    </article>
  );
};
