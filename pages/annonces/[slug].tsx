import React from 'react';

import { GetServerSideProps } from 'next';
import Page from '../../layouts';
import { NotASirenError, SirenNotFoundError } from '../../models';
import {
  redirectPageNotFound,
  redirectServerError,
  redirectSirenIntrouvable,
} from '../../utils/redirect';
import { Section } from '../../components/section';
import ButtonLink from '../../components/button';
import HorizontalSeparator from '../../components/horizontal-separator';
import Title, { FICHE } from '../../components/title-section';
import { Tag } from '../../components/tag';
import Annonces from '../../components/annonces';
import { FullTable } from '../../components/table/full';
import { EAdministration } from '../../models/administration';
import getConventions, {
  IConventions,
} from '../../models/annonces-conventions';

const AnnoncesAndConventionsPage: React.FC<IConventions> = ({
  uniteLegale,
  conventionCollectives,
}) => (
  <Page
    small={true}
    title={`Justificatif d’immatricuation - ${uniteLegale.nomComplet}`}
    noIndex={true}
  >
    <div className="content-container">
      <Title
        name={uniteLegale.nomComplet}
        siren={uniteLegale.siren}
        isActive={uniteLegale.siege.estActif}
        isDiffusible={uniteLegale.estDiffusible}
        ficheType={FICHE.ANNONCES}
      />
      <Annonces siren={uniteLegale.siren} />
      <HorizontalSeparator />
      <Section title="Conventions collectives" source={EAdministration.METI}>
        {conventionCollectives.length === 0 ? (
          <div>Cette entité n’a aucune convention collective enregistrée</div>
        ) : (
          <FullTable
            head={['SIRET', 'Titre', 'N°IDCC', 'Convention']}
            body={conventionCollectives.map((convention) => [
              <a href={`/etablissement/${convention.siret}`}>
                {convention.siret}
              </a>,
              convention.title,
              <Tag>{convention.idccNumber}</Tag>,
              <ButtonLink target="_blank" href={convention.url} alt small>
                ⇢&nbsp;Consulter
              </ButtonLink>,
            ])}
          />
        )}
      </Section>
    </div>
    <style jsx>{`
      .separator {
        width: 10px;
        height: 10px;
      }
      .description {
        display: flex;
        margin-bottom: 20px;
        flex-direction: row;
      }
      .logo-wrapper {
        padding-left: 20px;
        width: calc(30% - 20px);
      }
      .logo-wrapper svg {
        width: 100%;
      }
      .content-container {
        margin: 20px auto 40px;
      }
      @media only screen and (min-width: 1px) and (max-width: 900px) {
        .description {
          flex-direction: column;
        }
        .logo-wrapper {
          margin: 20px auto 0;
          padding: 0;
        }
      }
    `}</style>
  </Page>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  //@ts-ignore
  const siren = context.params.slug as string;

  try {
    const conventions = await getConventions(siren);

    return {
      props: conventions,
    };
  } catch (e) {
    if (e instanceof NotASirenError) {
      redirectPageNotFound(context.res, siren);
    } else if (e instanceof SirenNotFoundError) {
      redirectSirenIntrouvable(context.res, siren);
    } else {
      redirectServerError(context.res, e.message);
    }
    return { props: {} };
  }
};

export default AnnoncesAndConventionsPage;