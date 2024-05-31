import { TAG_API } from '@/Services/base';
import { getTokenFromLocalStorage } from '../records/index';

export interface Tag {
  id: string;
  icon: string;
  title: string;
  type: string;
}

const tagApi = TAG_API.injectEndpoints({
  endpoints: (build) => ({
    getAllTags: build.query<Tag[], {id: string}>({
      query: (data) => ({
        url: `tags/userTag/${data.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      providesTags(result){
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: "Tags" as const, id })),
            { type: "Tags" as const, id: "LIST" },
          ];
          return final;
        }
        const final = [{ type: "Tags" as const, id: "LIST" }];
        return final;
      }
    }),
    addTag: build.mutation<string, {id: string, body: Omit<Tag, 'id'>}>({
        query: (data) => ({
          url: `tags/userTag/${data.id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
          body: JSON.stringify(data.body)
        }),
        invalidatesTags: (result, error, data) => [{type: "Tags", id: "LIST"}]
      }),
  }),
  overrideExisting: true,
});
export const {useLazyGetAllTagsQuery, useAddTagMutation} = tagApi

