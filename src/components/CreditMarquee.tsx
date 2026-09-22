const REPEAT = 6;

export default function CreditMarquee() {
  const items = Array.from({ length: REPEAT });

  return (
    <div className="overflow-hidden bg-black/20 border-t border-background/10">
      <div
        className="flex w-max items-center"
        style={{ animation: "cpc-marquee 22s linear infinite" }}
      >
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center">
            {items.map((_, i) => (
              <div key={i} className="flex items-center">
                <a
                  href="https://cutpastecut.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 text-[13px] font-medium"
                >
                  <span className="text-background/30">
                    Tasarım &amp; Geliştirme
                  </span>
                  <span className="text-accent/80 font-semibold tracking-wide">
                    CUTPASTECUT®
                  </span>
                </a>
                <span
                  className="mx-8 h-1 w-1 rounded-full bg-accent/40"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
