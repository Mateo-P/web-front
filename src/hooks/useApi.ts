import useSWR from 'swr';
import { useStateValue } from '../State/StateProvider';
import fetcher from '../shared/fetcher';

const useApi = (method: string, url: string, body: Object) => {
    const [{ token }] = useStateValue();

    const { data, error, mutate, revalidate } = useSWR(
        url,
        (url) => fetcher(url, method, token, body),
        {
            revalidateOnFocus: true
        }
    );

    return { payload: data, isLoading: !error && !data, error, mutate, revalidate };
};
export default useApi;
