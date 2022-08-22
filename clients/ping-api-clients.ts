import { verifyIdRna } from '../utils/helpers/id-rna';
import { verifySiren } from '../utils/helpers/siren-and-siret';
import { fetchAssociation } from './rna';
import { fetchRNCSImmatriculationNoCache } from './rncs';
import { checkINPIpdfProxy } from './rncs/rncs-proxy-pdf-test';
import { fetchRnmImmatriculation } from './rnm';
import { getUniteLegaleInseeNoCache } from './sirene-insee/siren';
import getResults from './sirene-ouverte/recherche';
import getUniteLegaleSireneOuverte from './sirene-ouverte/siren';
import fetchConventionCollectives from './siret-2-idcc';

export class APISlugNotFound extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

const ping = async (slug: string | string[]) => {
  switch (slug) {
    case 'api-proxy-rncs':
      // fetch IRM and disable cache
      return await fetchRNCSImmatriculationNoCache(verifySiren('880878145'));
    case 'api-proxy-rncs-pdf':
      // fetch IRM and disable cache
      return await checkINPIpdfProxy(verifySiren('552032534'));
    case 'api-rnm':
      return await fetchRnmImmatriculation(verifySiren('824024350'));
    case 'api-conventions-collectives':
      return await fetchConventionCollectives(['54205118000066']);
    case 'api-sirene-insee':
      return await getUniteLegaleInseeNoCache(verifySiren('880878145'));
    case 'api-sirene-donnees-ouvertes':
      return await getUniteLegaleSireneOuverte(verifySiren('880878145'));
    case 'api-rna':
      return await fetchAssociation(verifyIdRna('W551000280'));
    case 'api-recherche':
      return await getResults('test', 1);
    default:
      throw new APISlugNotFound(404, `API ping ${slug} not found`);
  }
};

export const pingAPIClient = async (slug: string | string[]) => {
  try {
    await ping(slug);
    return { test: true, status: 200 };
  } catch (e: any) {
    if (e instanceof APISlugNotFound) {
      throw e;
    } else {
      return { test: false, status: e.status || 500 };
    }
  }
};
