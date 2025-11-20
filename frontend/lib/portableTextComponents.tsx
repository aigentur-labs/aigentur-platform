import Image from "next/image";

// Custom Portable Text components
export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div style={{ margin: "2rem 0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src={value.asset.url}
            alt={value.alt || "Post image"}
            width={1200}
            height={700}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      );
    },
  },

  block: {
    h1: ({ children }: any) => (
      <h1 style={{ fontSize: "2rem", margin: "2rem 0 1rem" }}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ fontSize: "1.7rem", margin: "2rem 0 1rem" }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontSize: "1.4rem", margin: "1.5rem 0 1rem" }}>{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p style={{ margin: "1rem 0", lineHeight: 1.7 }}>{children}</p>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul style={{ margin: "1rem 0", paddingLeft: "1.5rem", listStyle: "disc" }}>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol style={{ margin: "1rem 0", paddingLeft: "1.5rem", listStyle: "decimal" }}>
        {children}
      </ol>
    ),
  },

  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        style={{ color: "#2563eb", textDecoration: "underline" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};
