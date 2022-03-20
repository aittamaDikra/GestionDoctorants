import { IFormationDoctoranle } from 'app/entities/formation-doctoranle/formation-doctoranle.model';
import { IDoctorant } from 'app/entities/doctorant/doctorant.model';

export interface IFormationSuivie {
  id?: number;
  duree?: number;
  attestation?: string;
  formationDoctoranle?: IFormationDoctoranle | null;
  doctorant?: IDoctorant | null;
}

export class FormationSuivie implements IFormationSuivie {
  constructor(
    public id?: number,
    public duree?: number,
    public attestation?: string,
    public formationDoctoranle?: IFormationDoctoranle | null,
    public doctorant?: IDoctorant | null
  ) {}
}

export function getFormationSuivieIdentifier(formationSuivie: IFormationSuivie): number | undefined {
  return formationSuivie.id;
}
