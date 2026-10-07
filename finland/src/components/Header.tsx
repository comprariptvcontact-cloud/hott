import { useState, useEffect } from "react";
import { Search, User, Menu, X, Tv } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthModal from "./AuthModal";

const loginLabel: Record<string, string> = { de: "Anmelden", en: "Login", nl: "Inloggen" };

interface HeaderProps {
  langPrefix: string;
  onPricingClick: () => void;
  onReviewsClick: () => void;
  onMoviesClick: () => void;
  onChannelsClick: () => void;
  onPaymentsClick: () => void;
}

export default function Header({ langPrefix, onPricingClick, onReviewsClick, onMoviesClick, onChannelsClick, onPaymentsClick }: HeaderProps) {
  const { t, lang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        {/* Main navigation */}
        <header className="w-full border-b border-white/10" style={{ background: "#0d0d0d" }}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href={langPrefix} aria-label="NERO IPTV — home" className="shrink-0 select-none flex items-center no-underline cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-[#facc15] font-black text-xl tracking-tight uppercase" style={{ fontStyle: "normal" }}>NERO</span>
                <span className="text-white font-black text-xl tracking-tight uppercase" style={{ fontStyle: "normal" }}>&nbsp;IPTV</span>
              </a>

              <nav className="hidden md:flex items-center gap-1">
                <button onClick={onMoviesClick} className="px-3 py-1.5 text-base font-bold whitespace-nowrap text-white hover:text-white/80 transition-colors flex items-center gap-1">
                  {t.nav.movies}
                  <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button onClick={onChannelsClick} className="hidden sm:flex p-2.5 text-white/70 hover:text-white transition-colors" aria-label="TV Guide">
                <Tv className="w-5 h-5" />
              </button>
              <button onClick={onReviewsClick} className="hidden sm:flex p-2.5 text-white/70 hover:text-white transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setAuthOpen(true)} className="hidden sm:flex p-2.5 text-white/70 hover:text-white transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setAuthOpen(true)} className="hidden sm:flex text-white text-sm font-medium hover:text-white/70 transition-colors pl-1">
                {loginLabel[lang] ?? loginLabel.en}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/75 hover:text-white transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-1" style={{ background: "#0d0d0d" }}>
              <a href={langPrefix} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-white border-b border-white/10">{t.nav.home}</a>
              <button onClick={() => { onMoviesClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-white/75 border-b border-white/10">{t.nav.movies}</button>
              <button onClick={() => { onChannelsClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-white/75 border-b border-white/10">{t.nav.channels}</button>
              <button onClick={() => { onPricingClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-white/75 border-b border-white/10">{t.nav.pricing}</button>
              <button onClick={() => { onReviewsClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-white/75 border-b border-white/10">{t.nav.reviews}</button>
              <a href={`${langPrefix}/blog`} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-white/75 border-b border-white/10">{t.nav.blog}</a>
              <button onClick={() => { onPaymentsClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-white/75 border-b border-white/10">{t.nav.payments}</button>
              <a href={`${langPrefix}/agb`} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-white/75">{t.nav.terms}</a>

              <button
                onClick={() => { onPricingClick(); setMobileMenuOpen(false); }}
                className="w-full text-center py-3 rounded-lg text-sm font-bold text-white mt-3"
                style={{ background: "#facc15" }}
              >
                {t.nav.mobileSubscribe}
              </button>
            </div>
          )}
        </header>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
