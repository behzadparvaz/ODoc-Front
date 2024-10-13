export type ProductDetailDataModel = {
  adverseEffects: string;
  drugDoses: { dose: string; irc: string }[];
  medicalUses: string;
  productName: string;
  slangs: { name: string }[];
  warning: string;
};
