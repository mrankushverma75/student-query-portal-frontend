import axiosClient from "@/lib/axiosClient";

export const submitQuery = async (url: string, formData: FormData) => {
  const { data } = await axiosClient.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateQuery = async (url: string, formData: FormData) => {
  const { data } = await axiosClient.put(url, formData);
  return data;
};

export const fetchQueries = async ({ queryKey }: { queryKey: any[] }) => {
  const [, url] = queryKey;
  const { data } = await axiosClient.get(url);
  return data;
};
