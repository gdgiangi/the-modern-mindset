// Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page.
import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

type Data = {
  name: string;
};

export default async function emails(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email } = req.body;

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateEmail($email: String!) {
      createEmail_List(data: { email: $email })
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
