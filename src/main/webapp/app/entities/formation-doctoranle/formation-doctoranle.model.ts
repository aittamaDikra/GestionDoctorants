import dayjs from 'dayjs/esm';
import { IFormationSuivie } from 'app/entities/formation-suivie/formation-suivie.model';

export interface IFormationDoctoranle {
  id?: number;
  thematique?: string;
  dateDeFormation?: dayjs.Dayjs | null;
  dureeDeFormation?: number | null;
  formationSuivies?: IFormationSuivie[] | null;
}

export class FormationDoctoranle implements IFormationDoctoranle {
  constructor(
    public id?: number,
    public thematique?: string,
    public dateDeFormation?: dayjs.Dayjs | null,
    public dureeDeFormation?: number | null,
    public formationSuivies?: IFormationSuivie[] | null
  ) {}
}

export function getFormationDoctoranleIdentifier(formationDoctoranle: IFormationDoctoranle): number | undefined {
  return formationDoctoranle.id;
}
