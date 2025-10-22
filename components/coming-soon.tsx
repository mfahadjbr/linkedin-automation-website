import Link from "next/link"

export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center border rounded-2xl p-8 bg-card">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-6">This page is coming soon. Check back later.</p>
          <Link className="underline" href="/">Go back home</Link>
        </div>
      </div>
    </section>
  )
}
