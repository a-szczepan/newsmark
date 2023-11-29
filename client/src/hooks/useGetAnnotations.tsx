import { useEffect, useState } from 'react';
import { useLazyGetAnnotationsQuery } from '../store/api/articleApi';

type AnnotationAPI = {
  id: number;
  userEmail: string;
  articleUrl: string;
  title: string;
  selectedText: string;
  paragraphNumber: number;
  substringPosition: {
    end: number;
    start: number;
  };
  color: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export const useGetAnnotations = () => {
  const [
    getAnnotations,
    { data: fetchedAnnotations, isSuccess: gotannotations }
  ] = useLazyGetAnnotationsQuery({});
  const [annotations, setAnnotations] = useState<AnnotationAPI[]>([]);

  useEffect(() => {
    if (gotannotations) setAnnotations(fetchedAnnotations);
  }, [fetchedAnnotations, gotannotations]);

  return { annotations, getAnnotations };
};
