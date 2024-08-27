"use dom";

export default function DOMCoolCode({ code }: { code: string }) {
  return (
    <div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
