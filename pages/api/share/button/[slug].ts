import { NextApiRequest, NextApiResponse } from 'next';
import logErrorInSentry from '../../../../utils/sentry';

const button = (
  { query: { slug, light = '' } }: NextApiRequest,
  res: NextApiResponse
) => {
  const isSiren = slug.length === 9;
  const path = `${isSiren ? 'entreprise' : 'etablissement'}/${slug}`;

  const fontColor = !light ? '#fff' : '#000091';
  const backgroundColor = !light ? '#000091' : '#fff';

  try {
    res.status(200).send(`
    <html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="next-head-count" content="2" />
    <style>
      html {
        font-size:18px;
        line-height:25px;
        font-family: 'Marianne', sans-serif;
      }
      body {
        margin:0;
        padding:0;
      }
      .btn-wrapper {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
      }
      .btn-container {
        width: 100%;
        text-decoration:none;
        display: inline-block;
        border-radius: 4px;
        border: 1px solid ${fontColor};
        background-color: ${backgroundColor};
        color: ${fontColor};
        font-size:1rem;
        padding: 7px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 15px;
        padding-bottom: 15px;
      }
      .btn-container .img {
        width: 40px;
        overflow: hidden;
        border-radius: 2px;
        margin-right: 10px;
      }
      .btn-container
        .img
        > svg {
        width: 100%;
        display: block;
      }
      .btn-container .large {
        font-size: 1.15rem;
      }

      @media only screen and (min-width: 1px) and (max-width: 290px) {
        html {
          font-size:14px;
          line-height:21px;
        }
        .btn-container {
          padding-top:3px;
          padding-bottom:3px;
        }
      } 
      @media only screen and (min-width: 290px) and (max-width: 350px) {
        html {
          font-size:16px;
          line-height:23px;
        }
        .btn-container {
          padding-top:5px;
          padding-bottom:5px;
        }
      } 
    </style>
  </head>
  <body>
      <div class="btn-wrapper">
        <a
          href="https://annuaire-entreprises.data.gouv.fr/${path}"
          target="_blank"
          rel="noopener"
          class="btn-container"
          ><div class="img">
            <svg
              viewBox="0 0 196 196"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#a)">
                <path
                  fill="#fff"
                  d="M0 0h196v196H0z"
                ></path>
                <path
                  d="M34.838 165.82c1.904-1.915 3.828-3.958 5.753-6.022a111.953 111.953 0 0 1 11.167-11.492 37.387 37.387 0 0 1 3.66-2.937c.316-.319.316-1 .655-1.341-1.671.681-2.686 2.129-4.357 2.703-.339 0-.656-.34-.339-.681l3.596-2.703h-.233c-.338 0-.338-.319-.338-.659-4.357-.681-7.72 2.362-10.723 5.043-.677.341-1.354-.319-1.671-.319-5.034 1.681-8.714 6.065-13.748 8.087v-.745c-2.009.681-3.976 1.894-6.028 2.362a35.397 35.397 0 0 1-8.46.341 106.08 106.08 0 0 0-12.182 2.128H1.25a27.412 27.412 0 0 0-6.345 2.532l-.232.128c-.145.2-.3.392-.466.575a8.34 8.34 0 0 1-2.305 2.128 34.054 34.054 0 0 0-5.563 4.384.827.827 0 0 1-.528.17c-1.798 1.745-3.575 3.49-5.415 5.192-.315.155-.672.2-1.015.128.063-.111.134-.218.211-.319.276-.49.55-.958.847-1.426.296-.468.655-1.043.994-1.575.338-.532.93-1.383 1.438-2.128a.319.319 0 0 0 0-.447.655.655 0 0 0-.465-.17 31.976 31.976 0 0 1 5.626-4.256c-.233 0-.55 0-.381-.319.169-.32.38-.617.57-.937l.128-.298-.254-.255c-.561.319-1.092.69-1.586 1.107-.804.723-1.438 2.128-2.644 2.128h-.508a.802.802 0 0 1-.36-.128c.05-.104.106-.203.17-.298l.148-.277.127-.234.232-.425.19-.32c.128-.255.276-.489.424-.744l.211-.362.36-.596c.17-.298 0-.511-.254-.617a7.428 7.428 0 0 1 2.284-2.001c1.27-.659 2.56-1.447 3.85-2.128l.55-.489a22.72 22.72 0 0 0-5.33 2.66 2.465 2.465 0 0 0-.571.298.838.838 0 0 1-.846-.298.448.448 0 0 1 0-.255c.338-.681 1.332-1.022 2.115-1.682.338 0 .655 0 .655.341 10.745-8.513 25.38-6.384 37.88-10.79l3.025-2.128c1.67-.659 3.003-2.341 5.034-3.362a14.888 14.888 0 0 0 5.69-7.768 1.193 1.193 0 0 0-.34-.659 51.816 51.816 0 0 1-14.804 11.13c-7.043 3.702-14.806 3.021-22.124 4.043.339-.681.994-.681 1.671-.681 0-1 .677-1.341 1.354-2.022h.994c.338 0 .338-.681.677-.681.655 0 1.67-.319 1.332-.319-.994-1.362-3.003 1-4.695 0 .677-.681.338-1.702 1.015-2.022h1.333c.071-.516.309-.994.676-1.362 5.034-3.043 9.73-5.384 14.404-8.086-.994 0-1.671 1-2.665.34.655 0 0-1.021.655-1.021 3.702-1.001 6.705-3.044 10.406-4.384-1.353 0-2.347 1.021-3.701 0 .677-.341 1.015-1.001 2.115-1.001v-1.021c0-.34.338-.34.677-.34a1.182 1.182 0 0 1-.677-.341c.338-.66 1.354-.34 2.115-1-.317 0-.994 0-.994-.341a6.666 6.666 0 0 1 4.357-2.021c-.338-.681-1.354 0-1.354-.681 0-.341.339-.341.677-.341h-.677c-.655-.34-.317-1-.317-1.341 2.115-2.362 2.115-5.405 3.003-8.086-.338 0-.655 0-.655-.341-3.363 3.703-8.714 5.044-13.748 6.384h-1.819a6.895 6.895 0 0 1-5.71-.34 23.373 23.373 0 0 1-3.384-2.83 39.524 39.524 0 0 0-8.46-4.044 74.806 74.806 0 0 0-25.825-3.703c3.701-2.128 7.762-2.128 11.738-3.383 5.69-1.682 11.062-3.703 17.09-3.363a11.012 11.012 0 0 0-3.342 0c-4.695-.34-9.39 1-14.424 2.128-3.342.66-6.345 2.022-9.708 2.703-2.01.66-3.025 2.681-5.372 2.362v-1.021c3.362-4.044 7.38-8.087 12.69-8.513 6.049-1.021 11.738 0 17.766.66 4.282.47 8.524 1.259 12.69 2.362 1.692 0 2.115 2.703 3.363 3.043 2.115.681 4.018 0 6.028 1.341 0-.66-.339-1.341 0-2.022 1.353-1.34 3.024.341 4.357-.34 2.686-1.681-2.348-4.703-3.68-7.066.035-.258.154-.497.338-.68 2.665 2.362 4.695 5.064 8.037 6.746 1.67.681 5.69 1.681 5.034-.341-1.671-3.703-5.034-6.746-7.72-10.108v-1.362c-.656 0-.656-.34-.994-.66v-1.362c-1.354-.681-1.015-2.022-1.692-3.022-.994-1.702-.317-4.065-.994-6.086a32.941 32.941 0 0 1-1.333-5.725c-.782-5.767-2.136-10.81-2.897-16.216-.677-6.384 3.68-11.47 6.704-17.195a28.909 28.909 0 0 1 9.391-10.79c1.317-4.015 14.604-16.791 25.03-20.962C72.978 4.17 83.403 0 95.914 0l-262.723-27.106v213.909l138.766 21.708c6.345-4.618 36.78-28.518 45.748-32.944 4.252-2.086 13.875-6.512 17.132-9.747Zm-51.48-24.218c-.655 0-2.115.341-1.67-.34.338-1.681 2.686-1.681 4.018-2.362.677-.341 1.67-1 2.348-.66.676 1 1.67.66 2.347 1.341-2.072 2.021-4.758 1.021-7.043 2.021Zm-51.331-7.427a1.109 1.109 0 0 1-.339-.659 105.588 105.588 0 0 0 10.723-17.195 46.608 46.608 0 0 0 11.337-9.449 64.946 64.946 0 0 1 18.76-14.897 12.933 12.933 0 0 1 8.714.32c-.994 1.361-2.686 1.02-4.018 2.127a1.283 1.283 0 0 1-1.016-.319 1.258 1.258 0 0 0 .339-1.021c-3.342 3.703-8.037 5.405-10.723 9.789-1.946 3.362-3.279 7.619-7.636 8.725-1.353.341.339-1.021-.338-.681-10.427 6.406-17.766 14.173-25.803 23.26Zm27.812-22.238c-.338.659-.698.744-1.015 1.34a2.502 2.502 0 0 1-1.332 1.341c-.339 0-.677 0-.677-.34a4.268 4.268 0 0 1 .962-1.854 4.222 4.222 0 0 1 1.724-1.168c.338 0 .338.34.338.681Zm15.567 50.521c-.2.383-.482.717-.825.979.423 0 .719.276.444.532a7.48 7.48 0 0 1-2.538 1.766 1.874 1.874 0 0 1-.529 0 32.74 32.74 0 0 1-1.248 1.171c-.423.383-2.242 0-1.67-.405.57-.404 1.628-1.575 2.474-2.341.466-.447.973-.851 1.396-1.34a4.08 4.08 0 0 1 .72-.766c.274-.107 2.05-.256 1.776.404Zm-6.007-2.788c-1.248.894-2.496 1.788-3.828 2.554-1.332.766-2.94 1.489-4.42 2.128a.444.444 0 0 0-.571-.128 15.36 15.36 0 0 0-3.363 2.575 4.87 4.87 0 0 0-.466.468l-.465.469c-.233.234-.465.468-.74.787a1.546 1.546 0 0 1-.444.468c-.212.128-.783.128-.72-.255l-.592.298a4.15 4.15 0 0 0-.529.298.418.418 0 0 0-.232 0 .312.312 0 0 0-.233 0c-.423.319-.825.659-1.227 1.021a16.275 16.275 0 0 0-1.924 2.128l-.106.128v.149l-.233.319a.552.552 0 0 1-.275.149l-.127-.213a1.138 1.138 0 0 1-.105-.17c0-.17-.19-.34-.275-.532a.645.645 0 0 1 0-.17c.36-.383.698-.788 1.057-1.213l.339-.426.02-.426.191-.255c.381-.489.72-.958 1.058-1.426l.148-.213c.169-.234.317-.489.465-.723.133-.22.252-.447.36-.681v-.128l.317-.787a1.052 1.052 0 0 1 0-.234 3.312 3.312 0 0 1 0-.362l.127-.489a.282.282 0 0 0 0-.235c.385-.651.83-1.264 1.332-1.83l-.148.107c-.486.298-.803.744-1.248 1.064-.444.319-1.036-.171-.613-.49.268-.218.522-.452.761-.702a18.681 18.681 0 0 1 1.714-1.703c.38-.276.719-.532 1.015-.787a.485.485 0 0 0 .148-.149c.236-.299.49-.583.761-.851 3.194-3.128 8.608-2.979 12.838-4.959 1.671-.681 3.68.32 5.351 0 1.052-.1 2.11.13 3.025.66-2.644 1.171-5.393 3.043-8.143 4.767Zm6.853-23.409c-.317-.341 1.015 0 1.353-.681h-2.707c-.338 0-.338-.341-.338-.681-1.671.34-3.68 1.021-5.351 1.362-2.348.66-4.357 2.341-7.043 3.022-3.68 1.362-6.705 4.384-10.723 5.746-.339 0-.339-.341-.339-.681.339-1.022 1.671-1.341 2.348-2.363 0-.34 0-.68-.339-.68 2.687-3.703 6.346-5.725 9.73-8.768v-1.001c.994-1.361 2.664-2.021 3.341-3.724a5.999 5.999 0 0 1 3.363-3.022c-.338-.34-1.015-.34-1.015-1.021-1.332 0-2.686.681-4.019-.341a4.832 4.832 0 0 1 2.115-1.191 1.227 1.227 0 0 1-.761-.49c-.338-.681.656-1.426 1.67-1.681 1.355-.341 3.025-.341 4.04-1.362-2.347-.319-5.033.681-7.38-.66a17.996 17.996 0 0 1 8.46-10.129c.338 0 1.015 0 1.015.34a3.333 3.333 0 0 1-.72 2.193 3.295 3.295 0 0 1-1.967 1.191 33.69 33.69 0 0 1 8.038 2.021c-.339.66-.995.341-1.333.341 1.67 1 3.68.319 5.351 1.681-.994 1-2.115 0-3.003 0 10.384 3.022 21.446 5.384 30.16 12.13a91.21 91.21 0 0 1-23.117 7.087 7.238 7.238 0 0 1-2.686-.341c0 .341 0 1.022-.339 1.022a5.403 5.403 0 0 0-3.341.681 4.215 4.215 0 0 1-4.463-.043v.043Z"
                  fill="#000091"
                ></path>
                <path
                  d="M308.596-41.702 102.17 0c.637.213 10.426 0 29.812 9.192l4.801 2.575a15.912 15.912 0 0 1 6.345 5.384c.655 1.021 1.671 3.043.994 4.384-.677 1.702-.994 4.384-2.686 5.065a12.22 12.22 0 0 1-7.022.68 16.831 16.831 0 0 1-4.04-.68c5.034 2.021 9.729 4.383 13.071 9.108.338.68 1.692 1.021 3.024 1.021.339 0 .339.66.339 1-.677.682-1.333 1.022-1.015 2.022h1.015c1.671-.68 1.332-4.043 3.68-3.022a3.804 3.804 0 0 1 1.671 2.252 3.832 3.832 0 0 1-.317 2.792 35.529 35.529 0 0 1-4.04 3.384 3.05 3.05 0 0 0 0 2.362 10.233 10.233 0 0 1 1.692 4.043c.994 2.362 1.332 5.065 2.348 7.406a48.629 48.629 0 0 1 2.347 15.195c0 2.681-1.353 5.043-.338 7.746a28.183 28.183 0 0 0 3.68 7.087 50.746 50.746 0 0 1 3.68 5.384c2.009 3.383 5.711 6.746 4.04 10.811-1.015 2.362-4.696 2.128-7.043 3.362-2.009 1.681-.339 4.384.655 6.065 1.692 3.043-2.009 5.065-4.356 6.086.676 1.001 2.115.66 2.347 1.341.339 1.681 2.009 2.703 1.015 4.384-1.353 2.022-5.372 3.043-3.362 6.065 1.353 2.362.486 4.98-.318 7.427a8.291 8.291 0 0 1-2.385 3.305 8.223 8.223 0 0 1-3.664 1.76c-2.061.6-4.234.71-6.345.319a4.857 4.857 0 0 0-2.115-.659c-5.689-.681-11.4-2.363-17.089-2.363a19.944 19.944 0 0 0-4.696 1.341 30.639 30.639 0 0 0-4.06 3.618l-.719.809-.445.532s-.19.212-.275.34a32.24 32.24 0 0 0-2.643 3.895l-.148.255-.254.468a31.302 31.302 0 0 0-2.538 6.193c-2.284 7.725-1.29 14.343.317 15.961.444.447 11.062 3.745 18.464 7.044 2.734 1.168 30.723 13.808 33.269 15.346l85.095 41.702 64.638-281.49Z"
                  fill="#E1000F"
                ></path>
                <path
                  d="M141.52 73.44c1.332.34 3.342.34 3.342 1.02-.656 2.704-4.696 3.363-6.705 6.066h-.994c-1.015.68-.677 2.362-1.692 2.362a4.626 4.626 0 0 0-3.003.34 5.753 5.753 0 0 0 2.25 1.704 5.718 5.718 0 0 0 2.783.425 1.522 1.522 0 0 1 .994 1.362c.26-.026.501-.147.677-.34.339 0 .677 0 .677.34v1.34c-1.015 1.341-2.686.681-4.04 1 2.529.683 5.192.683 7.72 0 2.115-.66 0-4.043 1.333-5.724-.656 0 0-1-.656-1 .656-.681 1.333-1.703 2.009-2.128a2.382 2.382 0 0 0 2.01-1c0-.681-1.354-1.022-1.016-1.682 2.01-1.362 3.681-3.383 3.025-5.405-.339-1-3.025-1-4.695-1.681a10.998 10.998 0 0 0-5.69.34 27.116 27.116 0 0 0-5.034 1.34 22.948 22.948 0 0 0-6.345 3.385 47.176 47.176 0 0 1 7.361-2.129c1.891-.221 3.803-.2 5.689.064Z"
                  fill="#9D9D9C"
                ></path>
              </g>
              <defs>
                <clipPath id="a" >
                  <path
                    fill="#fff"
                    d="M0 0h196v196H0z"
                  ></path>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <div >Voir plus d’informations sur</div>
            <div class=" large">
              L’Annuaire des Entreprises
            </div>
          </div></a
        >
      </div>
  </body>
</html>

    `);
  } catch (e: any) {
    logErrorInSentry(e, { siren: slug as string });
    res.status(500).json({ message: e });
  }
};

export default button;
