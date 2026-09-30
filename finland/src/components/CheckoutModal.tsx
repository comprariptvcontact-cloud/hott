import { useState, FormEvent } from "react";
import { PricingPlan } from "../types";
import { X, ShieldCheck, Mail, User, Watch, CreditCard, Rocket, CheckCircle2, QrCode } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface CheckoutModalProps {
  plan: PricingPlan;
  onClose: () => void;
}

type CheckoutStep = "fill" | "processing" | "success";

const coTexts: Record<string, {
  title: string;
  subtitle: string;
  selectedPlan: string;
  totalPrice: string;
  moLabel: string;
  fullName: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  deviceLabel: string;
  paymentLabel: string;
  cryptoSave: string;
  authorise: string;
  sslNote: string;
  processingTitle: string;
  processingDesc: (device: string) => string;
  successTitle: string;
  successDesc: (email: string) => string;
  loginCreds: string;
  activeConn: string;
  howToWatch: (device: string) => string;
  step1: string;
  step2: string;
  step3: string;
  closeBtn: string;
  fillError: string;
  checkoutBadge: string;
  pmCard: string;
  pmPaypal: string;
  pmCrypto: string;
  pmAppleGoogle: string;
  credUser: string;
  credPass: string;
  credM3u: string;
  credPortal: string;
}> = {
  de: {
    title: "Bestellung abschließen",
    subtitle: "Wählen Sie Ihr Gerät und starten Sie Ihr IPTV Premium-Abonnement sofort.",
    selectedPlan: "Ausgewähltes Paket",
    totalPrice: "Gesamtpreis",
    moLabel: "Mo.",
    fullName: "Vollständiger Name",
    namePlaceholder: "z.B. Max Mustermann",
    emailLabel: "E-Mail-Adresse (für sofortige Lieferung)",
    emailPlaceholder: "z.B. max@beispiel.de",
    deviceLabel: "Gerät / Empfänger",
    paymentLabel: "Zahlungsmethode",
    cryptoSave: "🪙 Crypto spart 5%",
    authorise: "Sichere Zahlung autorisieren",
    sslNote: "SSL-verschlüsselte Kasse. 24-Stunden-Zufriedenheitsgarantie.",
    processingTitle: "Ihre sicheren Zugangsdaten werden generiert...",
    processingDesc: (device) => `Wir verifizieren Ihre Zahlung via 3D-Secure und aktivieren Ihr „${device}"-Gerät für Ihren neuen IPTV Premium Stream.`,
    successTitle: "Einrichtung abgeschlossen!",
    successDesc: (email) => `Eine ausführliche Einrichtungsanleitung wurde an ${email} gesendet.`,
    loginCreds: "Anmeldedaten",
    activeConn: "Aktive Verbindung",
    howToWatch: (device) => `So schauen Sie auf Ihrem ${device}:`,
    step1: "Laden Sie IPTV Smarters Pro oder Tivimate aus Ihrem App Store herunter.",
    step2: "Geben Sie die oben angezeigten Anmeldedaten ein.",
    step3: "Drücken Sie Verbinden und genießen Sie ununterbrochenes Premium-TV!",
    closeBtn: "Schließen & Streaming starten",
    fillError: "Bitte füllen Sie alle Pflichtfelder aus.",
    checkoutBadge: "Sichere Kasse v3.1",
    pmCard: "Kredit-/Debitkarte",
    pmPaypal: "PayPal Express",
    pmCrypto: "Kryptowährung",
    pmAppleGoogle: "Apple/Google Pay",
    credUser: "Benutzername:",
    credPass: "Passwort:",
    credM3u: "M3U Live-Playlist-URL:",
    credPortal: "Xtream Codes Portal-URL:",
  },
  en: {
    title: "Complete your order",
    subtitle: "Select your device and start your IPTV Premium subscription instantly.",
    selectedPlan: "Selected Plan",
    totalPrice: "Total Price",
    moLabel: "mo",
    fullName: "Full name",
    namePlaceholder: "e.g. John Smith",
    emailLabel: "Email address (for instant delivery)",
    emailPlaceholder: "e.g. john@example.com",
    deviceLabel: "Device / Receiver",
    paymentLabel: "Payment method",
    cryptoSave: "🪙 Crypto saves 5%",
    authorise: "Authorise secure payment",
    sslNote: "SSL-encrypted checkout. 24-hour satisfaction guarantee.",
    processingTitle: "Generating your secure credentials...",
    processingDesc: (device) => `We are verifying your payment via 3D-Secure and activating your "${device}" device for your new IPTV Premium stream.`,
    successTitle: "Setup complete!",
    successDesc: (email) => `A detailed setup guide has been sent to ${email}.`,
    loginCreds: "Login Credentials",
    activeConn: "Active Connection",
    howToWatch: (device) => `How to watch on your ${device}:`,
    step1: "Download IPTV Smarters Pro or Tivimate from your app store.",
    step2: "Enter the login credentials shown above.",
    step3: "Press Connect and enjoy uninterrupted premium TV!",
    closeBtn: "Close & Start Streaming",
    fillError: "Please fill in all required fields to continue.",
    checkoutBadge: "Secure Checkout v3.1",
    pmCard: "Credit / Debit Card",
    pmPaypal: "PayPal Express",
    pmCrypto: "Cryptocurrency",
    pmAppleGoogle: "Apple/Google Pay",
    credUser: "Username:",
    credPass: "Password:",
    credM3u: "M3U Live Playlist URL:",
    credPortal: "Xtream Codes Portal URL:",
  },
  nl: {
    title: "Bestelling afronden",
    subtitle: "Selecteer uw apparaat en start direct uw IPTV Premium-abonnement.",
    selectedPlan: "Geselecteerd pakket",
    totalPrice: "Totaalprijs",
    moLabel: "mnd",
    fullName: "Volledige naam",
    namePlaceholder: "bijv. Jan Jansen",
    emailLabel: "E-mailadres (voor directe levering)",
    emailPlaceholder: "bijv. jan@voorbeeld.nl",
    deviceLabel: "Apparaat / Ontvanger",
    paymentLabel: "Betaalmethode",
    cryptoSave: "🪙 Crypto bespaart 5%",
    authorise: "Veilige betaling autoriseren",
    sslNote: "SSL-versleutelde checkout. 24-uurs tevredenheidsgarantie.",
    processingTitle: "Uw beveiligde inloggegevens worden gegenereerd...",
    processingDesc: (device) => `Wij verifiëren uw betaling via 3D-Secure en activeren uw "${device}"-apparaat voor uw nieuwe IPTV Premium-stream.`,
    successTitle: "Installatie voltooid!",
    successDesc: (email) => `Een gedetailleerde installatiegids is verzonden naar ${email}.`,
    loginCreds: "Inloggegevens",
    activeConn: "Actieve verbinding",
    howToWatch: (device) => `Zo kijkt u op uw ${device}:`,
    step1: "Download IPTV Smarters Pro of Tivimate uit uw app store.",
    step2: "Voer de hierboven getoonde inloggegevens in.",
    step3: "Druk op Verbinden en geniet van ononderbroken premium TV!",
    closeBtn: "Sluiten & Streaming starten",
    fillError: "Vul alle verplichte velden in om door te gaan.",
    checkoutBadge: "Veilige checkout v3.1",
    pmCard: "Credit-/Debitkaart",
    pmPaypal: "PayPal Express",
    pmCrypto: "Cryptovaluta",
    pmAppleGoogle: "Apple/Google Pay",
    credUser: "Gebruikersnaam:",
    credPass: "Wachtwoord:",
    credM3u: "M3U Live Afspeellijst URL:",
    credPortal: "Xtream Codes Portal-URL:",
  },
};

export default function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const { lang } = useLanguage();
  const ct = coTexts[lang] ?? coTexts.en;
  const [step, setStep] = useState<CheckoutStep>("fill");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [device, setDevice] = useState("Firestick");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    m3uUrl: "",
    portalUrl: "http://auraserve.xyz:8080"
  });

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      alert(ct.fillError);
      return;
    }

    setStep("processing");

    setTimeout(() => {
      const randUser = "user_" + Math.random().toString(36).substring(2, 7);
      const randPass = Math.random().toString(36).substring(2, 9);
      setCredentials({
        username: randUser,
        password: randPass,
        m3uUrl: `http://auraserve.xyz:8080/get.php?username=${randUser}&password=${randPass}&output=ts`,
        portalUrl: "http://auraserve.xyz:8080/c/"
      });
      setStep("success");
    }, 2800);
  };

  const finalPrice = paymentMethod === "Crypto" ? (plan.price * 0.95).toFixed(2) : plan.price.toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-[#111211]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

      <div className="bg-black border-2 border-neutral-900 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative animate-in zoom-in-95 duration-200 text-left">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-colors border border-white/10"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {/* Step 1: Form */}
        {step === "fill" && (
          <form onSubmit={handleCheckoutSubmit} className="p-6 md:p-8">
            <span className="text-[#facc15] text-[10px] font-bold font-mono uppercase tracking-widest bg-[#facc15]/5 px-3 py-1 rounded-full">
              {ct.checkoutBadge}
            </span>
            <h3 className="text-2xl font-black text-white mt-4">
              {ct.title}
            </h3>
            <p className="text-xs text-white/60 mt-1">
              {ct.subtitle}
            </p>

            <div className="mt-5 bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-white/50">{ct.selectedPlan}</span>
                <p className="text-sm font-extrabold text-white">{plan.name} • {plan.durationMonths} {ct.moLabel}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono font-bold text-white/50">{ct.totalPrice}</span>
                <p className="text-lg font-black text-[#facc15]">{plan.price} €</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#facc15]" />
                  <span>{ct.fullName}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={ct.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#facc15]" />
                  <span>{ct.emailLabel}</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={ct.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">
                  {ct.deviceLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Firestick", "Smart TV", "Apple TV", "Android Box", "M3U / Playlist"].map((dev) => (
                    <button
                      key={dev}
                      type="button"
                      onClick={() => setDevice(dev)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        device === dev
                          ? "bg-[#facc15] text-white border-[#facc15]"
                          : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {dev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5 flex items-center justify-between">
                  <span>{ct.paymentLabel}</span>
                  <span className="text-[10px] text-[#facc15] font-mono font-bold tracking-tight">{ct.cryptoSave}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[ct.pmCard, ct.pmPaypal, ct.pmCrypto, ct.pmAppleGoogle].map((pm) => {
                    const mappedMethod = pm === ct.pmCrypto ? "Crypto" : pm;
                    return (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setPaymentMethod(mappedMethod)}
                        className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-all ${
                          paymentMethod === mappedMethod
                            ? "bg-[#facc15]/10 border-[#facc15] ring-1 ring-[#facc15]"
                            : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">{pm}</span>
                        <span className="text-[9px] text-white/50 font-mono mt-0.5">
                          {mappedMethod === "Crypto" ? (plan.price * 0.95).toFixed(2) + " €" : plan.price.toFixed(2) + " €"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-[#facc15] border-[1.5px] border-[#facc15] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#422006] transition-all shadow-[0_3px_0_#422006] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2"
              >
                <span>{ct.authorise} {finalPrice} €</span>
                <Rocket className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-white/50 text-center mt-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#facc15]" />
                <span>{ct.sslNote}</span>
              </p>
            </div>

          </form>
        )}

        {/* Step 2: Processing */}
        {step === "processing" && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-[#facc15] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            <h4 className="text-lg font-black text-white">
              {ct.processingTitle}
            </h4>
            <p className="text-xs text-white/60 mt-2 max-w-sm">
              {ct.processingDesc(device)}
            </p>

            <div className="mt-6 text-[10px] font-mono text-white/50 bg-white/5 px-4 py-2 rounded-lg">
              TRANSACTION-ID: IPTV_{Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="p-6 md:p-8">
            <div className="text-center flex flex-col items-center mb-5">
              <div className="w-12 h-12 bg-[#facc15]/10 rounded-full flex items-center justify-center text-[#facc15] mb-3">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-extrabold text-white">
                {ct.successTitle}
              </h4>
              <p className="text-xs text-white/60 mt-1">
                {ct.successDesc(email)}
              </p>
            </div>

            <div className="bg-[#111211] text-white p-5 rounded-2xl border border-neutral-800 space-y-3 font-mono text-2s">
              <div className="border-b border-neutral-800 pb-2 flex justify-between items-center">
                <span className="text-white/50 uppercase tracking-widest text-[9px] font-bold">{ct.loginCreds}</span>
                <span className="text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#facc15]/40 border border-[#facc15]/30">🟢 {ct.activeConn}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">{ct.credUser}</span>
                <span className="text-white font-bold">{credentials.username}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">{ct.credPass}</span>
                <span className="text-white font-bold">{credentials.password}</span>
              </div>

              <div className="pt-2 border-t border-neutral-800 space-y-1">
                <span className="text-white/50 block text-[10px]">{ct.credM3u}</span>
                <div className="bg-black p-2 rounded text-[10px] text-neutral-300 break-all leading-tight select-all cursor-pointer hover:bg-neutral-950 transition-colors">
                  {credentials.m3uUrl}
                </div>
              </div>

              <div className="pt-1.5 space-y-1">
                <span className="text-white/50 block text-[10px]">{ct.credPortal}</span>
                <div className="bg-black p-2 rounded text-[10px] text-neutral-300 break-all select-all cursor-pointer">
                  {credentials.portalUrl}
                </div>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-[#facc15]/5 border border-[#facc15]/10 text-xs">
              <p className="font-bold text-[#facc15]">{ct.howToWatch(device)}</p>
              <ol className="list-decimal pl-4.5 mt-1 text-white/60 space-y-1">
                <li>{ct.step1}</li>
                <li>{ct.step2}</li>
                <li>{ct.step3}</li>
              </ol>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-center"
            >
              {ct.closeBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
