import Image from "next/image";     
export default function DashboardPreview() {
    return(
          <section className="relative z-20 my-5">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="rounded-2xl border border-border bg-background shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                  <Image
                    src="/images/dashboard.png"
                    alt="ClassFellow dashboard preview"
                    width={2400}
                    height={1400}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
        </section>
    )
}