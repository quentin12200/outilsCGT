// Administration de l'application.
// Les comptes listés ici voient le panneau d'administration sur la page
// Compte (liste des comptes militants et des espaces syndicats).
// IMPORTANT : les règles Firestore (voir FIREBASE.md) doivent contenir
// les mêmes adresses, sinon la lecture des données sera refusée.

export const ADMIN_EMAILS = ['leyrat.quentin@gmail.com'];

export function estAdmin(user) {
  return Boolean(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
}
