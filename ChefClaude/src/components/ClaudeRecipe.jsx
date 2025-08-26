import Markdown from "react-markdown";

const ClaudeRecipe = ({ recipe }) => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-2">Chef Claude Recommends:</h2>
      <article
        className="text-[#475467] leading-7 text-[1.125rem] font-normal"
        aria-live="polite"
      >
        <Markdown
          components={{
            ul: ({ children }) => (
              <ul className="list-disc ml-6 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal ml-6 mb-4">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-2">{children}</li>,
          }}
        >
          {recipe}
        </Markdown>
      </article>
    </section>
  );
};

export default ClaudeRecipe;
