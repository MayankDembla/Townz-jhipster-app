export interface ICusotmerAppBanner {
  id?: number;
  image?: string;
  location?: string;
}

export class CusotmerAppBanner implements ICusotmerAppBanner {
  constructor(public id?: number, public image?: string, public location?: string) {}
}
