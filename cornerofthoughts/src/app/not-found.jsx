import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link href="/">Go Home</Link>
    </div>
  );
}
