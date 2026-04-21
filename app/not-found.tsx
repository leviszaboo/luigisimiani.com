import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "8rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: "2rem", maxWidth: "500px" }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "white",
          color: "black",
          border: "none",
          textDecoration: "none",
          borderRadius: "4px",
          display: "inline-block",
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
