"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-10 text-red-500">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
