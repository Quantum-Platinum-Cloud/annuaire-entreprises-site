import routes from '#clients/routes';
import { IImmatriculationRNM } from '#models/immatriculation/rnm';
import {
  formatAdresse,
  formatFirstNames,
  formatNameFull,
  Siren,
} from '#utils/helpers';
import { httpGet } from '#utils/network';

export interface IApiRNMResponse {
  ent_id_num_gestion: string;
  ent_id_siren: string;
  ent_id_origine: string | null;
  ent_adr_numero_voie: string | null;
  ent_adr_indice_repetition: string | null;
  ent_adr_type_voie: string | null;
  ent_adr_adresse: string | null;
  ent_adr_adresse_complement: string | null;
  ent_adr_code_postal: string | null;
  ent_adr_commune: string | null;
  ent_adr_commune_cog: string | null;
  ent_act_code_nafa_principal: string | null;
  ent_act_date_immat_rm: string | null;
  ent_act_date_radiation: string | null;
  ent_act_date_debut_activite: string | null;
  ent_act_date_cessation_activite: string | null;
  ent_act_date_cloture_liquidation: string | null;
  ent_act_date_transfert_patrimoine: string | null;
  ent_act_date_dissolution: string | null;
  ent_act_modalite_exercice: string | null;
  ent_act_non_sedentaire: string | null;
  ent_act_activite_artisanales_declarees: string | null;
  ent_act_denomination_sociale: string | null;
  ent_act_sigle: string | null;
  ent_act_forme_juridique: string | null;
  ent_eff_salarie: string | null;
  ent_eff_apprenti: string | null;
  ent_jug_procedures: string | null;
  gest_maj_fichier: string | null;
  gest_date_maj: string | null;
  dir_qa_qualification: string | null;
  dir_id_nom_naissance: string | null;
  dir_id_nom_usage: string | null;
  dir_id_prenom_1: string | null;
  dir_id_prenom_2: string | null;
  dir_id_prenom_3: string | null;
  dir_id_pseudonyme: string | null;
  dir_id_date_naissance: string | null;
  dir_id_lieu_naissance: string | null;
  eirl_init_nom_registre: string | null;
  eirl_denomination: string | null;
  eirl_objet_dap: string | null;
  eirl_date_depot: string | null;
  gest_nar_4: string | null;
  gest_nar_20: string | null;
  gest_libelle_code_nafa: string | null;
  gest_dept: string | null;
  gest_reg: string | null;
  gest_emetteur: string | null;
  gest_categorie: string | null;
  gest_label_forme_juridique: string | null;
  epci: string | null;
  ent_act_code_apen: string | null;
}

export const clientRNM = async (siren: Siren): Promise<IImmatriculationRNM> => {
  const url = routes.rnm + siren + '?format=json';
  const response = await httpGet(url);
  return mapToDomainObject(siren, response.data);
};

const mapToDomainObject = (
  siren: Siren,
  apiRnmResponse: IApiRNMResponse
): IImmatriculationRNM => {
  const {
    ent_id_num_gestion,
    ent_act_code_nafa_principal,
    ent_act_activite_artisanales_declarees,
    gest_label_forme_juridique,
    gest_date_maj,
    ent_act_date_immat_rm,
    ent_act_date_debut_activite,
    ent_act_date_radiation,
    eirl_denomination,
    ent_act_denomination_sociale,
    ent_act_sigle,
    ent_adr_numero_voie,
    ent_adr_indice_repetition,
    ent_adr_type_voie,
    ent_adr_adresse,
    ent_adr_adresse_complement,
    ent_adr_code_postal,
    ent_adr_commune,
    dir_id_prenom_1,
    dir_id_nom_usage,
    dir_id_nom_naissance,
  } = apiRnmResponse;

  const prenomEtNom = `${formatFirstNames([
    dir_id_prenom_1 || '',
  ])} ${formatNameFull(dir_id_nom_naissance || '', dir_id_nom_usage || '')}`;

  const denomination =
    (ent_act_denomination_sociale || eirl_denomination || prenomEtNom) +
    (ent_act_sigle ? `(${ent_act_sigle})` : '');

  const adresse = formatAdresse({
    numeroVoie: ent_adr_numero_voie || '',
    indiceRepetition: ent_adr_indice_repetition || '',
    typeVoie: ent_adr_type_voie || '',
    libelleVoie: ent_adr_adresse || '',
    complement: ent_adr_adresse_complement || '',
    codePostal: ent_adr_code_postal || '',
    libelleCommune: ent_adr_commune || '',
  });

  return {
    siren,
    gestionId: ent_id_num_gestion,
    denomination,
    codeAPRM: ent_act_code_nafa_principal || '',
    activite: ent_act_activite_artisanales_declarees || '',
    dateImmatriculation: ent_act_date_immat_rm || '',
    dateRadiation: ent_act_date_radiation || '',
    dateMiseAJour: gest_date_maj || '',
    dateDebutActivite: ent_act_date_debut_activite || '',
    libelleNatureJuridique: gest_label_forme_juridique || '',
    adresse,
    downloadLink: `${routes.rnm}${siren}?format=pdf`,
    siteLink: `${routes.rnm}${siren}?format=html`,
  };
};
