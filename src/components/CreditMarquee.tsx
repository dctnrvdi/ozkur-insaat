const REPEAT = 5;

export default function CreditMarquee() {
  const items = Array.from({ length: REPEAT });

  return (
    <div className="overflow-hidden bg-black/20 border-t border-background/10">
      <div className="cpc-marquee-track flex items-center">
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center">
            {items.map((_, i) => (
              <div key={i} className="flex items-center">
                <a
                  href="https://cutpastecut.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cpc-sig-link flex items-center gap-3.5 py-5"
                >
                  <span className="cpc-label">Tasarım &amp; Geliştirme</span>
                  <span className="cpc-brand">CUTPASTECUT®</span>
                </a>
                <span className="cpc-sep" aria-hidden />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
