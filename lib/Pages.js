import { gql } from "@pantheon-systems/wordpress-kit";
import { client } from "./WordpressClient";

export async function getAllPagesUri() {
  const query = gql`
    query AllPages {
      pages {
        edges {
          node {
            id
            uri
          }
        }
      }
    }
  `;

  const {
    pages: { edges },
  } = await client.request(query);

  return edges.map(({ node }) => node.uri.replaceAll("/", ""));
}

export async function getLatestPages() {
  const query = gql`
    query LatestPagesQuery {
      pages(first: 10) {
        edges {
          node {
            id
            uri
            title
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const {
    pages: { edges },
  } = await client.request(query);

  return edges.map(({ node }) => node);
}

export async function getPageByUri(uri) {
  const query = gql`
    query PageByUriuery($uri: ID!) {
      page(id: $uri, idType: URI) {
        title
        date
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        content
      }
    }
  `;

  const { page } = await client.request(query, { uri });

  return page;
}
