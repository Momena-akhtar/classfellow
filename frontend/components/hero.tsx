import Image from "next/image";
import GetStarted from "./ui/get-started";

export default function Hero(){
    return(
      <section id="home" className="relative min-h-screen flex items-center pt-40 sm:pt-30 lg:pt-48 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">          
          {/* Left grid lines */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-[300px] md:w-[380px] lg:w-[440px] opacity-60 [mask-image:linear-gradient(to_right,white,transparent)]" style={{
            backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 2px, transparent 2px)',
            backgroundSize: '100px 100px'
          }}>
          </div>

          {/* Right grid lines */}
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[300px] md:w-[380px] lg:w-[440px] opacity-60 [mask-image:linear-gradient(to_left,white,transparent)]" style={{
            backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 2px, transparent 2px)',
            backgroundSize: '100px 100px'
          }}>
          </div>
          <div className="absolute inset-0 [background:radial-gradient(60%_38%_at_50%_42%,rgba(255,255,255,0.22),transparent_62%)] dark:[background:radial-gradient(60%_38%_at_50%_42%,rgba(255,255,255,0.09),transparent_62%)]"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight">
               Like a
                <span className="mx-2 bg-gradient-to-r from-primary via-primary/70 to-primary/80 bg-clip-text text-transparent">
                  genius friend {" "}
                </span>
                who never stops paying attention.
              </h1>
              <p className="text-base sm:text-medium lg:text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                Real-time AI that catches everything while you zone out.
              </p>
            </div>
            <GetStarted />
          </div>
          {/* Feature images grid - MOVED OUTSIDE max-w-3xl container */}
          <div className="grid grid-cols-3 gap-4 lg:gap-6 mt-12 sm:mt-16 w-full max-w-6xl mx-auto px-4">
            {/* Left column - 2 images */}
            <div className="flex flex-col gap-2 justify-start">
              {/* Small profile icons */}
              <div className="relative w-1/4 ml-auto">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img6.png" alt="Profile Icons" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
              {/* Recent sessions */}
              <div className="relative w-full">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img3.png" alt="Recent Sessions" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
              <div className="relative w-full">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img9.png" alt="Recent Sessions" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
            </div>

            {/* Middle column - 2 images */}
            <div className="flex flex-col gap-4 justify-start">
              {/* Live recording */}
              <div className="relative w-full">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img8.png" alt="Live Recording" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
              {/* Recent activities */}
              <div className="relative w-full">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img4.png" alt="Recent Activities" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
            </div>

            {/* Right column - 2 images */}
            <div className="flex flex-col gap-6 justify-start">
              {/* Mini sidebar */}
              <div className="relative w-2/3">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img2.png" alt="Mini Sidebar" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
              {/* Main dashboard */}
              <div className="relative w-full">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Image src="/images/img5.png" alt="Main Dashboard" className="relative w-full h-auto rounded-2xl border border-primary/10 object-cover" width={400} height={400} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}