/**
 * Google Ads conversion tracking.
 *
 * `gtag` itself is loaded (or not) by the tag in index.html. This module only
 * decides which conversion the click is reported against.
 *
 * The label below is intentionally empty: the previous value belonged to the
 * Google Ads account of a different site, so leaving it in place would have
 * credited every WhatsApp click on this domain to that account's campaigns.
 * While it is empty `trackWaConversion()` is a no-op — nothing breaks, no
 * conversion is sent.
 *
 * TODO: create the conversion action in the Google Ads account for
 * www.neroiptv.pro and paste its "send_to" value here, e.g.
 *   export const ADS_CONVERSION_SEND_TO = "AW-0000000000/xxxxxxxxxxxxxxxxxx";
 */
export const ADS_CONVERSION_SEND_TO = "";

/** Report a WhatsApp click as an Ads conversion, if one is configured. */
export function trackWaConversion(): void {
  if (!ADS_CONVERSION_SEND_TO) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag?.("event", "conversion", { send_to: ADS_CONVERSION_SEND_TO });
}
