import { IDoctorant } from 'app/entities/doctorant/doctorant.model';

export interface IBourse {
  id?: number;
  somme?: number | null;
  doctorant?: IDoctorant | null;
}

export class Bourse implements IBourse {
  constructor(public id?: number, public somme?: number | null, public doctorant?: IDoctorant | null) {}
}

export function getBourseIdentifier(bourse: IBourse): number | undefined {
  return bourse.id;
}
