import type { paths } from '@src/__generated__/api';
import createClient from 'openapi-fetch';

const client = createClient<paths>({
    baseUrl: `${process.env.NEXT_PUBLIC_META_TEST_SERVER_HOST_URL}`,
});

const { data, response } = await client.GET('/users');
