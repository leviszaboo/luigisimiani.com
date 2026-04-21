export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-85 max-sm:scale-70">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/galleries/flower-2.png" alt="Loading..." className="animate-spin" style={{ animationDuration: '5s' }} />
    </div>
  );
}
