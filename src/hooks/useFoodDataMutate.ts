import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interfaces/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): AxiosPromise<unknown> => {
    const response = await axios.post(API_URL + '/cardapio', data);
    return response;
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] });
        }
    });

    return mutation;
}
