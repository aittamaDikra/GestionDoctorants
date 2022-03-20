import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFormationDoctoranle, getFormationDoctoranleIdentifier } from '../formation-doctoranle.model';

export type EntityResponseType = HttpResponse<IFormationDoctoranle>;
export type EntityArrayResponseType = HttpResponse<IFormationDoctoranle[]>;

@Injectable({ providedIn: 'root' })
export class FormationDoctoranleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/formation-doctoranles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(formationDoctoranle: IFormationDoctoranle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formationDoctoranle);
    return this.http
      .post<IFormationDoctoranle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(formationDoctoranle: IFormationDoctoranle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formationDoctoranle);
    return this.http
      .put<IFormationDoctoranle>(`${this.resourceUrl}/${getFormationDoctoranleIdentifier(formationDoctoranle) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(formationDoctoranle: IFormationDoctoranle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formationDoctoranle);
    return this.http
      .patch<IFormationDoctoranle>(`${this.resourceUrl}/${getFormationDoctoranleIdentifier(formationDoctoranle) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFormationDoctoranle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFormationDoctoranle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFormationDoctoranleToCollectionIfMissing(
    formationDoctoranleCollection: IFormationDoctoranle[],
    ...formationDoctoranlesToCheck: (IFormationDoctoranle | null | undefined)[]
  ): IFormationDoctoranle[] {
    const formationDoctoranles: IFormationDoctoranle[] = formationDoctoranlesToCheck.filter(isPresent);
    if (formationDoctoranles.length > 0) {
      const formationDoctoranleCollectionIdentifiers = formationDoctoranleCollection.map(
        formationDoctoranleItem => getFormationDoctoranleIdentifier(formationDoctoranleItem)!
      );
      const formationDoctoranlesToAdd = formationDoctoranles.filter(formationDoctoranleItem => {
        const formationDoctoranleIdentifier = getFormationDoctoranleIdentifier(formationDoctoranleItem);
        if (formationDoctoranleIdentifier == null || formationDoctoranleCollectionIdentifiers.includes(formationDoctoranleIdentifier)) {
          return false;
        }
        formationDoctoranleCollectionIdentifiers.push(formationDoctoranleIdentifier);
        return true;
      });
      return [...formationDoctoranlesToAdd, ...formationDoctoranleCollection];
    }
    return formationDoctoranleCollection;
  }

  protected convertDateFromClient(formationDoctoranle: IFormationDoctoranle): IFormationDoctoranle {
    return Object.assign({}, formationDoctoranle, {
      dateDeFormation: formationDoctoranle.dateDeFormation?.isValid() ? formationDoctoranle.dateDeFormation.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDeFormation = res.body.dateDeFormation ? dayjs(res.body.dateDeFormation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((formationDoctoranle: IFormationDoctoranle) => {
        formationDoctoranle.dateDeFormation = formationDoctoranle.dateDeFormation ? dayjs(formationDoctoranle.dateDeFormation) : undefined;
      });
    }
    return res;
  }
}
