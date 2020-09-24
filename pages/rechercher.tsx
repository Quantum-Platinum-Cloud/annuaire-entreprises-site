import React from 'react';

import { GetServerSideProps } from 'next';
import Page from '../layouts';
import { Tag } from '../components/tag';
import { isSirenOrSiret } from '../utils/helper';
import { getResults, SearchResults } from '../model';
import { parsePage } from '../model/routes';

interface IProps {
  response: SearchResults;
  searchTerm: string;
  currentPage: number;
}

const About: React.FC<IProps> = ({ response, searchTerm, currentPage = 1 }) => (
  <Page small={true} currentSearchTerm={searchTerm}>
    <div className="content-container">
      {response.total_results ? (
        <div className="results-counter">
          {currentPage > 1 && `Page ${currentPage} de `}
          {response.total_results} résultats trouvés pour “<b>{searchTerm}</b>”.
          <a href={`/carte?terme=${searchTerm}`}>
            Afficher les résultats sur la carte
          </a>
        </div>
      ) : (
        <div className="results-counter">
          Aucune société n’a été trouvée pour “<b>{searchTerm}</b>”
          <p>
            Nous vous suggérons de vérifier l’orthographe du nom, du SIRET, ou
            de l'adresse que vous avez utilisé.
          </p>
        </div>
      )}
      <div className="results-list">
        {response.etablissement &&
          response.etablissement.map((etablissement: any) => (
            <a
              href={`/entreprise/${etablissement.siret}`}
              key={etablissement.siret}
              className="dont-apply-link-style"
            >
              <div className="title">
                {etablissement.l1_normalisee.toLowerCase()}
              </div>
              <div>{etablissement.libelle_activite_principale}</div>
              <div className="adress">
                {etablissement.geo_adresse}{' '}
                <Tag>
                  {etablissement.is_siege !== '1'
                    ? 'établissement secondaire'
                    : 'siège social'}
                </Tag>
              </div>
            </a>
          ))}
        {response.total_pages && response.total_pages > 1 && (
          <div className="pages-selector">
            {currentPage !== 1 && (
              <a href={`?terme=${searchTerm}&page=${currentPage - 1}`}>
                ⇠ précédente
              </a>
            )}
            <div>
              {/* @ts-ignore */}
              {[...Array(response.total_pages).keys()].map((pageNum) => {
                if (response.total_pages > 10) {
                  if (pageNum === 3) return <div key="none">...</div>;
                  if (pageNum > 3 && pageNum < response.total_pages - 3) {
                    return;
                  }
                }
                return (
                  <a
                    href={`?terme=${searchTerm}&page=${pageNum + 1}`}
                    className={`${currentPage === pageNum + 1 ? 'active' : ''}`}
                    key={pageNum}
                  >
                    {pageNum + 1}
                  </a>
                );
              })}
            </div>
            {currentPage !== response.total_pages && (
              <a href={`?terme=${searchTerm}&page=${currentPage + 1}`}>
                suivante ⇢
              </a>
            )}
          </div>
        )}
      </div>
    </div>

    <style jsx>{`
      .results-counter {
        margin-top: 10px;
        color: rgb(112, 117, 122);
      }

      .results-list > a {
        text-decoration: none;
        color: #333;
        margin: 25px 0;
        display: block;
      }
      .title {
        color: #000091;
        text-decoration: none;
        font-size: 1.4rem;
        margin-bottom: 5px;
      }

      .results-list > a:hover .title {
        text-decoration: underline;
      }

      .adress {
        font-size: 0.9rem;
        color: rgb(112, 117, 122);
      }

      .pages-selector {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
      }
      .pages-selector > div {
        display: flex;
        margin: 0 30px;
      }
      .pages-selector > div > a {
        border-radius: 3px;
        padding: 0 5px;
        margin: 0 3px;
      }
      .pages-selector > div > a.active {
        border: 1px solid #000091;
      }
    `}</style>
  </Page>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  //@ts-ignore
  const searchTerm = context.query.terme as string;

  if (isSirenOrSiret(searchTerm)) {
    context.res.writeHead(302, {
      Location: `/entreprise/${searchTerm}`,
    });
    context.res.end();
  }

  const results = await getResults(
    searchTerm,
    (context.query.page || '') as string
  );

  return {
    props: {
      response: results,
      searchTerm,
      currentPage: parsePage(results.page),
    },
  };
};

export default About;
