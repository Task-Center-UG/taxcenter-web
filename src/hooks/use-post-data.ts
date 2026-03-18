import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface UsePostDataProps<T, D, TContext> {
  url: string;
  invalidateKeys?: string[][];
  successMessage?: string;
  options?: UseMutationOptions<T, Error, D, TContext>;
}

export const usePostData = <T, D, TContext = unknown>({
  url,
  invalidateKeys = [],
  successMessage = "Data created successfully",
  options,
}: UsePostDataProps<T, D, TContext>) => {
  const queryClient = useQueryClient();
  const { onSuccess: userOnSuccess, onError: userOnError, ...restOptions } =
    options ?? {};

  const getErrorMessage = (error: AxiosError<any>) => {
    const responseData = error.response?.data;
    const detailMessage =
      responseData?.error?.details?.[0]?.message ||
      responseData?.details?.[0]?.message;

    return (
      detailMessage ||
      responseData?.error?.message ||
      responseData?.message ||
      error.message ||
      "Failed to create data"
    );
  };

  return useMutation<T, Error, D, TContext>({
    ...restOptions,
    mutationFn: async (payload) => {
      const isFormData = payload instanceof FormData;

      const { data } = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      });
      return data.data;
    },
    onSuccess: (...args) => {
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      toast.success(successMessage);

      if (userOnSuccess) {
        userOnSuccess(...args);
      }
    },
    onError: (...args) => {
      const error = args[0] as AxiosError<any>;
      const errorMessage = getErrorMessage(error);

      toast.error(errorMessage);

      if (userOnError) {
        userOnError(...args);
      }
    },
  });
};
