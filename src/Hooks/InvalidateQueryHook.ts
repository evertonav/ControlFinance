import { useQueryClient } from "@tanstack/react-query"

export function useInvalidateQuery() {
    const queryClient = useQueryClient()

    function invalidateQuery(queryKey: unknown[]) {
        queryClient.invalidateQueries({ queryKey })
    }

    return {
        invalidateQuery
    }
}