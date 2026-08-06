/* A1 Customs PA — site configuration
 *
 * DEPOSIT_PAYMENT_URL: paste the owner's payment link here to enable the
 * one-click "$100 deposit" button on the thank-you page.
 * Works with any hosted payment link, e.g.:
 *   - Square:  https://square.link/u/XXXXXXXX   (Square Dashboard → Payment Links)
 *   - Stripe:  https://buy.stripe.com/XXXXXXXX  (Stripe → Payment Links)
 *   - Cash App: https://cash.app/$yourcashtag/100
 * Leave it empty ("") and the site falls back to "we'll text you a payment
 * link" — no broken buttons.
 */
window.A1_CONFIG = {
  DEPOSIT_PAYMENT_URL: "",
};
